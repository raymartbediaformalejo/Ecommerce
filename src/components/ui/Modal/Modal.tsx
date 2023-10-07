import { ReactNode, useRef, useEffect, MouseEvent } from "react";
import ReactDom from "react-dom";
import classes from "../../../styles/components/ui/Modal.module.css";

type TModalsProps = {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
};

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();
  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};
const Modals = ({ isOpened, onClose, children }: TModalsProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpened) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.setAttribute("closing", "");
      modalRef.current?.addEventListener(
        "animationend",
        () => {
          modalRef.current?.removeAttribute("closing");
          modalRef.current?.close();
        },
        { once: true }
      );
    }
  }, [isOpened]);

  const handleClose = () => {
    modalRef.current?.setAttribute("closing", "");

    modalRef.current?.addEventListener(
      "animationend",
      () => {
        modalRef.current?.removeAttribute("closing");
        modalRef.current?.close();
      },
      { once: true }
    );
  };

  return ReactDom.createPortal(
    <dialog
      ref={modalRef}
      onCancel={onClose}
      onClick={(e) =>
        modalRef.current &&
        !isClickInsideRectangle(e, modalRef.current) &&
        onClose()
      }
      id="modal"
      className={classes["modal"]}
    >
      {children}
      <button onClick={handleClose}>close</button>
    </dialog>,

    document.getElementById("portal")!
  );
};

export default Modals;
