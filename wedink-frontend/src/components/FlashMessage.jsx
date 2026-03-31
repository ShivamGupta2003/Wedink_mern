import { useFlash } from '../context/FlashContext'

export default function FlashMessage() {
  const { flash, clearFlash } = useFlash()

  return (
    <>
      {flash.success && (
        <div
          className="alert alert-success alert-dismissible fade show responsive-alert"
          role="alert"
        >
          {flash.success}
          <button
            type="button"
            className="btn-close"
            onClick={clearFlash}
            aria-label="Close"
          ></button>
        </div>
      )}
      {flash.error && (
        <div
          className="alert alert-danger alert-dismissible fade show responsive-alert"
          role="alert"
        >
          {flash.error}
          <button
            type="button"
            className="btn-close"
            onClick={clearFlash}
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  )
}
