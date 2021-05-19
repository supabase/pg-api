import { parse } from "path"
import { PostgresMeta } from "."

// TODO: move to it's own class/file later
const parseColumn = (columnData: { name: string, format: string }) => {
  let dataType: string = ''
  switch (columnData.format) {
    case 'int8':
      dataType = 'number'
      break
  }

  return `${columnData.name}: ${dataType};`
}

export default class TypeScriptTypes {
  pgMeta: PostgresMeta

  constructor({ pgMeta }: { pgMeta: PostgresMeta }) {
    this.pgMeta = pgMeta
  }

  async dump(): Promise<any> {
    const { data, error } = await this.pgMeta.columns.list()
    // TODO: handle error

    if (data) {
      // types = data.reduce((prev, current) => {
      //   if (current.table in prev) {
      //     prev[current.table].push(parseColumn(current))
      //   } else {
      //     prev[current.table] = [parseColumn(current)]
      //   }

      //   return prev
      // }, {} as { [key: string]: Array<any> })

      return 'export interface definitions {\n  todos: {\n    ' + parseColumn(data[0]) + '\n  };\n}'
    }
  }
}
