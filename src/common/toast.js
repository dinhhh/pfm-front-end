import Swal from "sweetalert2";

export const successToast = ( title = "Lưu thanh công" ) => {
  var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  Toast.fire({
    icon: 'success',
    title: title
  });
}

export const warningToast = ( title = "Lưu thất bại" ) => {
  var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  Toast.fire({
    icon: 'warning',
    title: title
  });
}

export const loadingToast = ( title = "Loading" ) => {
  var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  Toast.fire({
    icon: 'loading',
    title: title
  });
}