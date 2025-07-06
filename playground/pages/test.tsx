import { showToast } from "../../src/core/commands";

export function testToast() {
  // This function is just for testing purposes
  // It can be used to test the Toaster component or any other functionality
  showToast("This is a test toast!", {
    duration: 3000,
    type: "success",
    toasterId: "toaster-1",
  });
}
