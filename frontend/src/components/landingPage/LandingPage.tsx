import ModalComponent from "../common/ModalComponent";
import SignIn from "../signIn/SignIn";

function LandingPage() {
  return (
    <>
      <ModalComponent
        buttonInner="Test"
        buttonProps={{
          type: "primary",
        }}
      >
        Test Modal
      </ModalComponent>

      <SignIn />
    </>
  );
}

export default LandingPage;
