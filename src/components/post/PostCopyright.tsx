import { author, site } from '@/config.json'
import { getFormattedDateTime } from '@/utils/date'
import { AnimatedSignature } from '../AnimatedSignature'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";

function getPostUrl(slug: string) {
  return new URL(slug, site.url).href
}

export function PostCopyright({
  title,
  slug,
  lastMod,
}: {
  title: string
  slug: string
  lastMod: Date
}) {
  const [lastModStr, setLastModStr] = useState('')
  const url = getPostUrl(slug)

  function handleCopyUrl() {
    navigator.clipboard.writeText(url)
    toast.success('링크가 복사되었어요!')
  }

  useEffect(() => {
    setLastModStr(getFormattedDateTime(lastMod))
  }, [lastMod])

  return (
    <section className="text-xs leading-loose text-secondary">
      <p>글 제목: {title}</p>
      <p>글 작성자: {author.name}</p>
      <p>
        <span>글 링크: {url}</span>{' '}
        <span role="button" className="cursor-pointer select-none" onClick={handleCopyUrl}>
          [링크 복사하기]
        </span>
      </p>
      <p>마지막 수정 시간: {lastModStr}</p>
      <hr className="my-3 border-primary" />
      <div>
        <div className="float-right ml-4 my-2">
          <AnimatedSignature />
        </div>
        <p>
          이 글은 출처를 표시하는 한 자유롭게 인용·스크랩·재배포할 수 있습니다.<br />또한 내용을 수정하거나 2차 창작물을 만들 경우, 반드시 동일한 라이선스로 공유해야합니다!
          <br />
          이 글은{' '}
          <a
            className="hover:underline hover:text-accent underline-offset-2"
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY-SA 4.0
          </a>
          {' '}라이선스를 따릅니다.
        </p>
      </div>
    </section>
  )
}
