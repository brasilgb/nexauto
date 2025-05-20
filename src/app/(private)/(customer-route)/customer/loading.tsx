export default function Loading() {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-gray-900/5 z-50'>
      <div className='flex items-center justify-center h-full'>
        <div className='w-18 h-18 border-4 border-y-primary animate-spin rounded-full' />
      </div>
    </div>
  )
}