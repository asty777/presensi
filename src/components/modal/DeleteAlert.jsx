import Swal from 'sweetalert2';

const DeleteAlert = () => {
  return Swal.fire({
    title: 'Anda yakin?',
    text: 'Anda tidak akan dapat mengembalikan ini!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '##303546',
    confirmButtonText: 'Ya, hapus saja!',
    cancelButtonText: 'Batal'
  });
};

export default DeleteAlert;

