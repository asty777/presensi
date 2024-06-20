import Swal from "sweetalert2";

class AlertComponent {
  Error(message) {
    Swal.fire({
      icon: "error",
      title: "Pemberitahuan!",
      text: message,
      confirmButtonColor: "red",
      confirmButtonText: "Tutup",
    });
  }

  LogoutConfirmation(title) {
    return Swal.fire({
      icon: "question",
      title: title,
      text: "Apakah yakin ingin Keluar dari sistem?",
      confirmButtonColor: "red",
      confirmButtonText: "Iya",
      showCancelButton: true,
      cancelButtonText: "Batal",
      cancelButtonColor: "grey",
    });
  }
  
  SuccessLogin(message) {
    Swal.fire({
      icon: "success",
      title: "Selamat Datang",
      text: message,
      confirmButtonText: "Tutup",
      confirmButtonColor: "#a3e635",
    });
  }

   AkunAcces(message) {
    Swal.fire({
      icon: "error",
      title: "Pemberitahuan!",
      text: message,
      confirmButtonColor: "red",
      confirmButtonText: "Tutup",
    });
  }

  ResetConfirmation(title) {
    return Swal.fire({
        icon: "question",
        title: title,
        text: "Apakah Anda yakin ingin mereset kata sandi?",
        confirmButtonColor: "grey",
        confirmButtonText: "Reset",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "Batal",
    });
}

}
export default new AlertComponent();