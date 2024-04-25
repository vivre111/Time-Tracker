import React from "react";

// a floating modal/box that appears when isOpen=true, children is its inner jsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "40%",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "16px",
            border: "none",
            background: "none",
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
