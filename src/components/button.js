export const AddButton = ( {onClickFunc} ) => {
  return (
    <button type="button" style={{borderWidth: 0, backgroundColor: "inherit"}} onClick={onClickFunc} >
      <i class="fa-regular fa-circle-plus" style={{color: "#28a745"}} />
    </button>
  );
}