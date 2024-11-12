// src/components/ConfirmModal.js
import React from 'react';
import './ConfirmModal.css';

function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onConfirm} className="confirm-button">Confirm</button>
                <button onClick={onCancel} className="cancel-button">Cancel</button>
            </div>
        </div>
    );
}

export default ConfirmModal;
// src/components/ConfirmModal.js
import React from 'react';
import './ConfirmModal.css';

function ConfirmModal({ 
    message, 
    onConfirm, 
    onCancel, 
    confirmLabel = "Confirm", 
    cancelLabel = "Cancel" 
}) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onConfirm} className="confirm-button">{confirmLabel}</button>
                <button onClick={onCancel} className="cancel-button">{cancelLabel}</button>
            </div>
        </div>
    );
}

export default ConfirmModal;
