import { RawItem } from './batch-download'

export const getFragmentsList = (count: number, originalTitle: string, extension: string) => {
  if (count < 2) {
    return null
  }
  const names = []
  for (let index = 1; index <= count; index++) {
    names.push(`file '${originalTitle} - ${index}${extension}'`)
  }
  return names.join('\n')
}
export const getBatchFragmentsList = (items: RawItem[], extension: string) => {
  const multipleFragments = (item: RawItem) => item.fragments.length > 1
  const fragmentsItems = items.filter(multipleFragments)
  if (fragmentsItems.length === 0) {
    return null
  }
  const names = new Map<string, string>()
  fragmentsItems.forEach(item => {
    names.set(escapeFilename(`ffmpeg-files-${item.title}.txt`), item.fragments.map((_, index) => {
      return `file '${item.title} - ${index + 1}${extension}'`
    }).join('\n'))
  })
  return names
}
export default {
  export: {
    getFragmentsList,
    getBatchFragmentsList,
  },
}