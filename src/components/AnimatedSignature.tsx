import Svg from '@/assets/signature.svg?raw'

export function AnimatedSignature() {
  return (
    <div
      className="my-custom-signature"
      dangerouslySetInnerHTML={{
        __html: Svg,
      }}
    ></div>
  )
}
