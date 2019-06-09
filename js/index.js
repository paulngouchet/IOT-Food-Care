const messages = [
  'hey',
  'heyy',
  'heyyy',
  "what's up?",
  'you there??',
  "how's it going?",
  'so...',
  'anybody home?',
  'just checking in',
  "what's going on?",
  'you around?',
  'let me know when you get this',
  'did you get my message?',
  'knock knock',
  "Light level is 20",
  'Temperature level is 60',
  'Temperature level 100',
  'Lower the temperature level',
  'Lower The Heat Level'
];



const messageList = document.querySelector('.message-list');

function randomMessage() {
  const i = Math.floor(Math.random() * messages.length);  // update this function to get data from the sensors
  return messages[i];
}

function buildMessage(message) {
  const li = document.createElement('li');
  li.classList.add('message');

  const avatar = document.createElement('div');
  avatar.classList.add('message__avatar');
  avatar.setAttribute('aria-hidden', 'true');
  avatar.appendChild(document.createTextNode('🖥️'));

  const messageEl = document.createElement('div');
  messageEl.classList.add('message__text');

  const hiddenText = document.createElement('span');
  hiddenText.classList.add('visually-hidden');
  hiddenText.appendChild(document.createTextNode('Message from server: '));
  messageEl.appendChild(hiddenText);
  messageEl.appendChild(document.createTextNode(message));

  li.appendChild(avatar);
  li.appendChild(messageEl);

  return li;
}

function scrollToBottom(animate) {
  if (animate) {
    const distance = messageList.scrollHeight - messageList.scrollTop;
    const steps = 10;
    const step = distance / steps;

    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        messageList.scrollTop = messageList.scrollTop + (i * step);
      }, 50 * i);
    }
  }
  else {
    messageList.scrollTop = messageList.scrollHeight;
  }
}

function showMessage(infinite) {
  const message = randomMessage();
  messageList.appendChild(buildMessage(message));
  scrollToBottom(infinite);

  if (infinite) {
    const delay = Math.random() * 2000 + 2000;
    setTimeout(() => showMessage(true), delay);
  }
}

const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
function handleReduceMotionChanged() {
  const animate = !motionQuery.matches;
  if (animate) {
    showMessage(true);
  }
  else {
    showMessage(false);
    showMessage(false);
    showMessage(false);
    showMessage(false);
    showMessage(false);
    showMessage(false);
    showMessage(false);
  }
}
handleReduceMotionChanged();
motionQuery.addListener(handleReduceMotionChanged);
