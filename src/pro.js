
var check = async () => {
    document
        .querySelectorAll('.yespro')
        .forEach(v => (v.style.display = 'none'));
    document
        .querySelectorAll('.nopro')
        .forEach(v => (v.style.display = 'block'));
    var r = await unary(
        'AppService.Account',
        M('Token', {
            token: localStorage.getItem("token"),
        }),
    );
    if(r.expiredat > parseInt(Date.now()/1000)){
        document
            .querySelectorAll('.nopro')
            .forEach(v => (v.style.display = 'none'));
        document
            .querySelectorAll('.yespro')
            .forEach(v => (v.style.display = 'block'));
    }
}

if(localStorage.getItem("token")){
    document
        .querySelectorAll('.nosignin')
        .forEach(v => (v.style.display = 'none'));
    document
        .querySelectorAll('.yessignin')
        .forEach(v => (v.style.display = 'block'));
        check();
}

var o = {};
document.querySelector('#getcode')
    .addEventListener('click', async e => {
        try {
            var r = await unary(
                'AppService.AccountSigninCode',
                M('AppAccountSigninCodeI', {
                    email: document.querySelector('#email').value,
                }),
            );
            o.codetoken = r.codetoken;
            document
                .querySelectorAll('.nocode')
                .forEach(v => (v.style.display = 'none'));
            document
                .querySelectorAll('.yescode')
                .forEach(v => (v.style.display = 'block'));

            document.querySelector('#girl').innerText =
                'Sent, check your inbox or spam';
            document.querySelector('#hi').open = true;
            setTimeout(
                () => (document.querySelector('#hi').open = false),
                3000,
            );
        } catch (e) {
            document.querySelector('#girl').innerText = e.message;
            document.querySelector('#hi').open = true;
            setTimeout(
                () => (document.querySelector('#hi').open = false),
                3000,
            );
        }
    });
document
    .querySelector('#signin')
    .addEventListener('click', async e => {
        try {
            var r = await unary(
                'AppService.AccountSignin',
                M('AppAccountSigninI', {
                    email: document.querySelector('#email').value,
                    code: document.querySelector('#code').value,
                    codetoken: o.codetoken,
                }),
            );
            document
                .querySelectorAll('.nosignin')
                .forEach(v => (v.style.display = 'none'));
            document
                .querySelectorAll('.yessignin')
                .forEach(v => (v.style.display = 'block'));
            localStorage.setItem("token", r.token);
            check();
        } catch (e) {
            document.querySelector('#girl').innerText = e.message;
            document.querySelector('#hi').open = true;
            setTimeout(
                () => (document.querySelector('#hi').open = false),
                3000,
            );
        }
    });

document
    .querySelector('#pay')
    .addEventListener(
        'click',
        async e => {
            var r = await unary(
                'AppService.Account',
                M('Token', {
                    token: localStorage.getItem("token"),
                }),
            );
            location.href = `https://www.txthinking.com/stripe.html?Kind=IPvBar&ID=${r.id}&Email=${encodeURIComponent(r.email)}`;
        },
    );

