import ModalComponent from "../common/ModalComponent";

function LandingPage() {
  return (
    <ModalComponent
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
