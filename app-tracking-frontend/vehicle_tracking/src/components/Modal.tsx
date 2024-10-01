import React from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};
export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>X</button>
            {children}
          </div>
        </div>,
        document.getElementById('modal') as HTMLElement
      );
}