const _0x5e7101=_0x25a4;(function(_0x2218f7,_0x23fdde){const _0x4f05bc=_0x25a4,_0x37cad4=_0x2218f7();while(!![]){try{const _0x280ed2=parseInt(_0x4f05bc(0x1b6))/0x1*(-parseInt(_0x4f05bc(0x19f))/0x2)+-parseInt(_0x4f05bc(0x1a8))/0x3+-parseInt(_0x4f05bc(0x1a9))/0x4+parseInt(_0x4f05bc(0x1a3))/0x5+parseInt(_0x4f05bc(0x1af))/0x6*(parseInt(_0x4f05bc(0x1aa))/0x7)+parseInt(_0x4f05bc(0x19c))/0x8+parseInt(_0x4f05bc(0x1a0))/0x9*(parseInt(_0x4f05bc(0x1b3))/0xa);if(_0x280ed2===_0x23fdde)break;else _0x37cad4['push'](_0x37cad4['shift']());}catch(_0x5da1e9){_0x37cad4['push'](_0x37cad4['shift']());}}}(_0x4d61,0x3731e));function _0x4d61(){const _0x1b0680=['recvonly','play','24348BTKqzb','track','connection','left','159020arBVXu','notify','log','19661RgHabF','innerText','RightEye-video','event_type','rabbit-go@twincam','1223272OKFwmr','removetrack','H264','14ICpaAU','99cmuSpb','wss://sora.ikeilabsora.0am.jp/signaling','srcObject','596920zmlBIz','mousedown','then','LeftEye-video','getElementById','408048LwdJeO','731432nQVlbs','406FyMlVI','touchstart','disconnect'];_0x4d61=function(){return _0x1b0680;};return _0x4d61();}const channelId=_0x5e7101(0x1ba),debug=![];var sora=null,recvonlyL,recvonlyR,channel_recvonly_connections=0x0;const options={'videoCodecType':_0x5e7101(0x19e)};function _0x25a4(_0x2c4f5d,_0x20ca31){const _0x4d610c=_0x4d61();return _0x25a4=function(_0x25a49d,_0x4afda9){_0x25a49d=_0x25a49d-0x19c;let _0x57816e=_0x4d610c[_0x25a49d];return _0x57816e;},_0x25a4(_0x2c4f5d,_0x20ca31);}function MakeCall(_0x34e588){const _0x286822=_0x5e7101;sora=Sora[_0x286822(0x1b1)](_0x286822(0x1a1),debug),recvonlyL=MakeCallfunc(_0x34e588,_0x286822(0x1b2)),recvonlyL['on'](_0x286822(0x1b0),_0x44a42e=>{const _0x4c551b=_0x286822,_0x13f5c0=_0x44a42e['streams'][0x0];let _0x30a603=document[_0x4c551b(0x1a7)]('LeftEye-video');_0x30a603[_0x4c551b(0x1a2)]=_0x13f5c0;}),recvonlyL['on'](_0x286822(0x19d),_0x379add=>{const _0x542c6c=_0x286822;let _0x57266d=document[_0x542c6c(0x1a7)](_0x542c6c(0x1a6));_0x57266d[_0x542c6c(0x1a2)]=null;}),recvonlyL['on'](_0x286822(0x1b4),(_0x133d37,_0x66c116)=>{const _0x56ebd0=_0x286822;(_0x133d37[_0x56ebd0(0x1b9)]=='connection.created'||_0x133d37[_0x56ebd0(0x1b9)]=='connection.destroyed')&&(channel_recvonly_connections=_0x133d37['channel_recvonly_connections']),console[_0x56ebd0(0x1b5)](_0x133d37,_0x66c116);});var _0x1c8b6a=document[_0x286822(0x1a7)]('unity-canvas');_0x1c8b6a['addEventListener'](_0x286822(0x1a4),function(_0x81a34f){const _0x59e5d2=_0x286822;let _0x553695=document[_0x59e5d2(0x1a7)](_0x59e5d2(0x1b8)),_0x551feb=document['getElementById']('LeftEye-video');_0x553695[_0x59e5d2(0x1ae)](),_0x551feb['play']();}),_0x1c8b6a['addEventListener'](_0x286822(0x1ab),function(_0x2f33c4){const _0x56b37f=_0x286822;let _0x14b393=document[_0x56b37f(0x1a7)]('RightEye-video'),_0x498fd0=document[_0x56b37f(0x1a7)](_0x56b37f(0x1a6));_0x14b393[_0x56b37f(0x1ae)](),_0x498fd0[_0x56b37f(0x1ae)]();});}function MakeCallfunc(_0x19c6a8,_0x31205f){const _0x263d3b=_0x5e7101;let _0x4b0134;return _0x4b0134=sora[_0x263d3b(0x1ad)](channelId+_0x31205f,null,options),_0x4b0134['connect'](),_0x4b0134;}function GetPersonList(_0x137e28){const _0x21dea0=_0x5e7101;var _0xfe3eb8=document[_0x21dea0(0x1a7)](_0x137e28);_0xfe3eb8[_0x21dea0(0x1b7)]=channel_recvonly_connections+'人';}function EndCall(){const _0x6c9714=_0x5e7101;recvonlyL[_0x6c9714(0x1ac)]()[_0x6c9714(0x1a5)](function(){});}