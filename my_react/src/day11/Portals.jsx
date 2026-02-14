import ReactDOM from "react-dom";

function Portal({ close }) {
  return ReactDOM.createPortal(
    <div>
      <p>This is a modal</p>
      <button onClick={close}>Close</button>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Portal;
