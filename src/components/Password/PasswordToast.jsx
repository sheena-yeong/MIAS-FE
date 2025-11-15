import * as Toast from '@radix-ui/react-toast';

function PasswordToast({ openAlert, setOpenAlert, title, description }) {
  return (
    <>
      <Toast.Root
        open={openAlert}
        onOpenChange={setOpenAlert}
        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm'
      >
        <Toast.Title className='text-lg font-semibold mb-2'>
          {title}
        </Toast.Title>
        <Toast.Description className='text-gray-600 mb-4'>
          {description}
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className='fixed bottom-4 right-4 z-50' />
    </>
  );
}

export default PasswordToast;
