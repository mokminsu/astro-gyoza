import { input } from '@inquirer/prompts'
import fs from 'fs'
import path from 'path'
import { isFileNameSafe } from './utils.js'

function getPostFullPath(fileName) {
  return path.join('./src/content/posts', `${fileName}.md`)
}

const fileName = await input({
  message: '파일 이름을 입력하세요',
  validate: (value) => {
    if (!isFileNameSafe(value)) {
      return '파일 이름은 영문, 숫자, 하이픈만 포함할 수 있습니다'
    }
    const fullPath = getPostFullPath(value)
    if (fs.existsSync(fullPath)) {
      return `${fullPath}이(가) 이미 존재합니다`
    }
    return true
  },
})

const title = await input({
  message: '글 제목을 입력하세요',
})

const content = `---
title: ${title}
date: ${new Date().toISOString()}
tags: []
comments: true
draft: false
---
`

const fullPath = getPostFullPath(fileName)
fs.writeFileSync(fullPath, content)
console.log(`${fullPath} 생성 성공`)
