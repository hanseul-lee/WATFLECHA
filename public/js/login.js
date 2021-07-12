let users = [];
let localUser;

const $loginBox = document.querySelector('.login-box');
const $loginId = document.querySelector('.login-id');
const $loginPw = document.querySelector('.login-pw');
const $errorMsgEmptyId = document.querySelector('.error-message-empty-id');
const $errorMsgEmptyPw = document.querySelector('.error-message-empty-pw');
const $loginButton = document.querySelector('.login-button');
const $loginRememberCheck = document.getElementById('idRememberCB');
const $signUpGo = document.querySelector('.sign-up-go');
const $errorMessage = document.querySelectorAll('.error-message');
const $inputBox = document.querySelectorAll('.inputBox');

let saveLogin;

// 스페이스 바 입력 방지 이벤트
[...$inputBox].forEach(input => 
  input.onkeydown = e => {
  const kcode = e.keyCode;
  if(kcode === 32) return false;
})


//로그인 버튼 클릭때 Id, pw 빈문자열로 초기화해주기.
$loginButton.onclick = async () => {
  $errorMsgEmptyId.textContent = '';
  $errorMsgEmptyPw.textContent = '';

  try {
    let errorcount = 0;

    [...$errorMessage].forEach(error => {
      error.classList.remove('active');
      error.previousElementSibling.classList.remove('errorColor');
    })

    //json가져와서(GET) 객체로 풀기(json())
    const res = await fetch(`/users/${$loginId.value}`);
    console.warn(res);
    users = res.json;

    //db의 id, pw 와 입력창의 id,pw가 같으면 추출. 추출된 값의 길이를 변수에 할당.
    const errorMessage = (elementNode) => {
      elementNode.classList.add('active');
      elementNode.previousElementSibling.classList.add('errorColor');
      elementNode.textContent = `${elementNode === $errorMsgEmptyId || elementNode === $errorMsgEmptyPw ? '정보를 올바르게 입력해 주세요.' : ''}`;
    }

    //id 입력창의 값이 공백이거나 db의 id와 다르면 오류 메시지 출력
    if ($loginId.value === "" ) {
      errorMessage($errorMsgEmptyId);
      ++errorcount;
    } else if ($loginId.value!==users.id) {
      errorMessage($errorMsgEmptyId);
      $errorMsgEmptyId.textContent = `아이디를 올바르게 입력해 주세요.`;
      ++errorcount;
    }

    //pw 입력창의 값이 공백이거나 db의 pw와 다르면 오류 메시지 출력
    if ($loginPw.value === "") {
      errorMessage($errorMsgEmptyPw);
      ++errorcount;
    } else if ($loginPw.value!==users.pw) {
      errorMessage($errorMsgEmptyPw);
      $errorMsgEmptyPw.textContent = `비밀번호를 올바르게 입력해 주세요.`;
      ++errorcount;
    }

    if(errorcount > 0) return;
    saveLogin = $loginRememberCheck.checked;
    console.warn(xhr.responseText)
    //id,pw입력창이 db의 id,pw와 같고 로그인 버튼을 누르면 main으로 이동.
    localStorage.setItem("login",
    JSON.stringify({
      id: users.id,
      name: users.name,
      genre: users.genre,
      savelog: saveLogin,
      curlog: true
    }));
    
    console.warn(xhr.responseText)
    localUser = JSON.parse(localStorage.getItem("login"));
    window.location.href="/html/main.html"
  }catch(err) {
    console.error('[ERROR~!]', err);
  }
}
//회원가입 버튼 클릭시 signUp으로 이동.
$signUpGo.onclick = () => {
  window.location.href = "/html/signUp.html"
}

//로드될때 localStorage 가져와서 객체로 풀기.
window.onload = () => {
  localUser = JSON.parse(localStorage.getItem('login'));
  if(localUser.savelog){
    $loginId.value = localUser.id;
  }
}

