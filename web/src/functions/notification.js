function notification(hit) {
  const n = new Notification(`New HIT!`, {
    icon: `./favicon.ico`,
    body: `A new HIT was posted!`,
  });

  n.onclick = () => {
    window.focus();
  };
}

export async function newHitNotification(settings, hit) {
  if (!settings.hitNotification || hit.filtered) {
    return;
  }

  if (Notification.permission === `granted`) {
    notification(hit);
  } else {
    const permission = await Notification.requestPermission();

    if (permission === `granted`) {
      notification(hit);
    }
  }
}
