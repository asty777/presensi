import Swal from 'sweetalert2';

const sweetAlertEdit = () => {
  return Swal.fire({
    title: 'Edit Produk',
    html: `
      <input id="productName" class="swal2-input" placeholder="Nama Produk">
      <input id="productQTY" class="swal2-input" placeholder="QTY Produk">
      <input id="productPrice" class="swal2-input" placeholder="Harga Produk">
    `,
    showCancelButton: true,
    confirmButtonColor: '#F08354',
    cancelButtonColor: '##303546',
    confirmButtonText: 'Simpan',
    cancelButtonText: 'Batal',
    preConfirm: () => {
      const productName = document.getElementById('productName').value;
      const productQTY = document.getElementById('productQTY').value;
      const productPrice = document.getElementById('productPrice').value;

      if (!productName || !productPrice || !productQTY) {
        Swal.showValidationMessage('Nama Produk, Harga dan Quantity tidak boleh kosong');
      };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Tersimpan!',
        'Perubahan berhasil disimpan.',
        'success'
      );
    }
  });
};

export default sweetAlertEdit;