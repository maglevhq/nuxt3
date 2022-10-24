import { PageSection, Section, SectionDefinitionMapping, TextSetting, ImageSetting, Block, PageBlock, ContentElement, Setting, PageSetting, BlockDefinitionMapping, IconSetting, SelectSetting, CheckboxSetting, RadioSetting, ColorSetting, LinkSetting } from '../types'

export function buildSection(Section: PageSection, sectionDefinitionMapping: SectionDefinitionMapping): Section {
  const section: Section = {
    id: Section.id,
    type: Section.type,
    settings: {},
    blocks: []
  }

  section.settings = buildSettings(
    section,
    Section.settings,
    sectionDefinitionMapping[Section.type].settings
  )

  section.blocks = Section.blocks.map(Block =>
    buildBlock(
      Block,
      sectionDefinitionMapping[Section.type].blocks
    )
  )

  return section
}

const buildBlock = (Block: PageBlock, blockDefinitionMapping: BlockDefinitionMapping): Block => {
  const block: Block = {
    id: Block.id,
    type: Block.type,
    settings: {}
  }

  block.settings = buildSettings(
    block,
    Block.settings,
    blockDefinitionMapping[block.type].settings
  )

  return block
}

const buildSettings = (contentElement: ContentElement, contentSetting: PageSetting[], settingMapping: Record<string, string>): Record<string, Setting> => {
  const settings: Record<string, Setting> = {}

  const settingFactory = new SettingFactory(contentElement)

  Object.keys(settingMapping).forEach((settingId) => {
    const type = settingMapping[settingId]
    const value = contentSetting.find(setting => setting.id === settingId)?.value
    settings[settingId] = settingFactory.build(type, settingId, value)
  })

  return settings
}

class SettingFactory {
  static settingMap: Record<string, (domId: string, value: unknown) => Setting> = {}

  parent: ContentElement

  constructor(parent: ContentElement) {
    this.parent = parent
  }

  static register(type: string, builder: (domId: string, value: any) => Setting) {
    this.settingMap[type] = builder
  }

  build(type: string, settingId: string, value: unknown): Setting {
    const builder = SettingFactory.settingMap[type]

    if (!builder) { throw new Error(`🚨 Unknow setting type: ${type}.`) }

    return SettingFactory.settingMap[type](this.domId(settingId), value)
  }

  private domId(settingId: string) {
    return `${this.parent.id}.${settingId}`
  }
}

SettingFactory.register('text', (domId, value: string): TextSetting => {
  return { domId, value }
})

SettingFactory.register('image', (domId, value: null | Record<string, any>): ImageSetting => {
  const safeValue = !value
    ? { url: null }
    : {
        url: value.url,
        altText: value.alt_text,
        size: value.size,
        width: value.width,
        height: value.height
      }
  return { domId, ...safeValue }
})

SettingFactory.register('link', (domId, value: any | undefined): LinkSetting => {
  const safeValue = !value
    ? { href: null, text: null, openNewTab: false }
    : {
        href: value.href,
        text: value.text,
        openNewTab: value.open_new_tab
      }
  return { domId, ...safeValue }
})

SettingFactory.register('icon', (domId, value: string): IconSetting => {
  return { domId, value }
})

SettingFactory.register('select', (domId, value: string): SelectSetting => {
  return { domId, value }
})

SettingFactory.register('radio', (domId, value: string): RadioSetting => {
  return { domId, value }
})

SettingFactory.register('checkbox', (domId, value: boolean): CheckboxSetting => {
  return { domId, value }
})

SettingFactory.register('color', (domId, value: string): ColorSetting => {
  return { domId, value }
})
