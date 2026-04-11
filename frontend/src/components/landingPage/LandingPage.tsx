import ModalComponent from "../common/ModalComponent";

function LandingPage() {
  return (
    <ModalComponent
      cancelButtonProps={{ danger: true, type: "primary" }}
      buttonInner="Test"
      buttonProps={{
        type: "primary",
      }}
    >
      Test Modal
    </ModalComponent>
  );
}

export default LandingPage;
