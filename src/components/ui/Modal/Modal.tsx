import { ReactNode, useRef, useEffect, MouseEvent, useState } from "react";
import { createPortal } from "react-dom";

import closeIcon from "../../../assets/icons/Close2.svg";
import classes from "../../../styles/components/ui/Modal/Modal.module.css";
import { CloseIcon } from "../../icons/CloseIcon";

type TModalsProps = {
  title?: string;
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

const Modal = ({ title, isOpened, onClose, children }: TModalsProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    setHasRendered(true);
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

  if (!hasRendered) {
    return null;
  }

  return createPortal(
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
      <div className={classes["modal-header"]}>
        <button onClick={onClose} className={classes["close-button"]}>
          {/* <img src={closeIcon} /> */}
          <CloseIcon />
        </button>
        {title && title?.length > 0 && (
          <h1 className={classes["title"]}>{title}</h1>
        )}
      </div>
      {children}
    </dialog>,
    document.getElementById("portal")!
  );
};

export default Modal;
