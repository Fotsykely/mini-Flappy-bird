function exitGame() {
    const confirmation = confirm("Are you sure you want to close this tab?");
    if (confirmation) {
      window.open('', '_self'); // Workaround to target the current tab
      window.close();          // Attempt to close it
    }
  }