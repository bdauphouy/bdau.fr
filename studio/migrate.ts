import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

type LocaleFile = {
  projects: Array<{
    id: string
    title: string
    description: string
    badges?: Array<{handle: string; title: string}>
    links?: Array<{title: string; url: string}>
  }>
  timeline: {
    items: Array<{
      date: string
      title: string
      text: string
      link?: string
      technologies?: string[]
      members?: Array<{name: string; link: string}>
    }>
  }
  archives: LocaleFile['projects']
}

type Globals = {
  isAvailable: boolean
  email: string
  meta: {name: string; twitter: string; theme: string}
  socials: Record<string, string>
}

const contentDir = path.resolve(__dirname, '../static/content')
const locales = ['en', 'fr', 'es'] as const

const files = Object.fromEntries(
  locales.map((locale) => [
    locale,
    JSON.parse(fs.readFileSync(path.join(contentDir, `${locale}.json`), 'utf-8')) as LocaleFile,
  ]),
) as Record<(typeof locales)[number], LocaleFile>

const globals = JSON.parse(
  fs.readFileSync(path.join(contentDir, 'globals.json'), 'utf-8'),
) as Globals

function localize<T extends string | undefined>(pick: (locale: (typeof locales)[number]) => T) {
  return Object.fromEntries(locales.map((locale) => [locale, pick(locale)]))
}

function mmddyyyyToIso(date: string): string {
  const [month, day, year] = date.split('/')
  return `${year}-${month}-${day}`
}

function projectDoc(
  category: 'highlight' | 'archive',
  key: 'projects' | 'archives',
  id: string,
  order: number,
) {
  const byLocale = (locale: (typeof locales)[number]) =>
    files[locale][key].find((p) => p.id === id)!

  return {
    _id: `project-${id}`,
    _type: 'project',
    id: {_type: 'slug', current: id},
    title: localize((locale) => byLocale(locale).title),
    description: localize((locale) => byLocale(locale).description),
    category,
    order,
    badges: byLocale('en').badges?.map((badge, i) => ({
      _key: `${id}-badge-${i}`,
      handle: badge.handle,
      title: localize((locale) => byLocale(locale).badges?.[i]?.title ?? badge.title),
    })),
    links: byLocale('en').links?.map((link, i) => ({
      _key: `${id}-link-${i}`,
      url: link.url,
      title: localize((locale) => byLocale(locale).links?.[i]?.title ?? link.title),
    })),
  }
}

function timelineItemDoc(index: number) {
  const en = files.en.timeline.items[index]

  return {
    _id: `timelineItem-${index}`,
    _type: 'timelineItem',
    date: mmddyyyyToIso(en.date),
    title: localize((locale) => files[locale].timeline.items[index].title),
    text: localize((locale) => files[locale].timeline.items[index].text),
    link: en.link,
    technologies: en.technologies,
    members: en.members?.map((member, i) => ({
      _key: `${index}-member-${i}`,
      name: member.name,
      link: member.link,
    })),
  }
}

function siteSettingsDoc() {
  return {
    _id: 'siteSettings',
    _type: 'siteSettings',
    isAvailable: globals.isAvailable,
    email: globals.email,
    metaName: globals.meta.name,
    metaTwitter: globals.meta.twitter,
    themeColor: globals.meta.theme,
    socials: Object.entries(globals.socials).map(([label, url], i) => ({
      _key: `social-${i}`,
      label,
      url,
    })),
  }
}

async function migrate() {
  const client = getCliClient({apiVersion: '2026-08-28'})

  const docs: Array<Record<string, unknown> & {_id: string; _type: string}> = [
    ...files.en.projects.map((p, i) => projectDoc('highlight', 'projects', p.id, i)),
    ...files.en.archives.map((p, i) => projectDoc('archive', 'archives', p.id, i)),
    ...files.en.timeline.items.map((_, i) => timelineItemDoc(i)),
    siteSettingsDoc(),
  ]

  let tx = client.transaction()
  for (const doc of docs) {
    tx = tx.createOrReplace(doc)
  }
  const result = await tx.commit()
  console.log(`Migrated ${docs.length} documents.`, result.transactionId)
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
