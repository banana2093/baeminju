//  미니언즈 좀비 탈출 애니 구현 JS - main.js
$(() => {
    ////// JQB //////////////////
    //  로딩확인
    console.log("로딩완료");

    /**************************************
            [ 요구사항정리 ]
        1. 버튼을 클릭하여 미니언즈가
        순서대로 특정위치로 이동하며
        메시지를 보여준다
        2. 각 위치별 좀비를 등장시킨다
        3. 맨윗층에서 탈출할때 헬기를 사용한다
        [ 변경대상 ]
        1. 주인공 미니언즈
        2. 좀비 미니언즈들
        3. 주사기
        4. 헬기
        [ 이벤트와 이벤트대상  ]
        1. 이벤트 : 클릭이벤트
        2. 이벤트대상 : 버튼들
        3. 기능구분 : 버튼글자(지시사항)

    **************************************/

    // 0. 주인공들 변수에 할당
    // (1) 미니언즈
    let mi = $(".mi");

    // (2) 건물 li
    let bd = $(".building li");

    // (3) 버튼들
    let btns = $(".btns button");

    // (4) 메시지박스
    let msg = $(".msg");

    // (5) 좀비, 주사기 요소 변수처리
    let mz1 = `<img src="images/mz1.png" alt="좀비1" class="mz">`;
    let mz2 = `<img src="images/mz2.png" alt="좀비2" class="mz">`;
    let zom = `<img src="images/zom.png" alt="좀비들" class="mz">`;
    let inj = `<img src="images/inj.png" alt="주사기" class="inj">`;

    // console.log(mi,bd,btns,msg);

    // 1. 건물 각 방에 번호넣기
    // each((순서,요소)=>{})
    bd.each((idx, ele) => {
        // text() 텍스트 넣기
        $(ele).text(idx);
        // 좀비넣기, 주사기 넣기
        switch (idx) {
            case 9:
                $(ele).append(mz1);
                break;
            case 7:
                $(ele).append(mz2);
                break;
            case 1:
                $(ele).append(zom);
                break;
            case 2:
                $(ele).append(inj);
                break;
        } ///////// switch case ////////
    }); ///////////// each /////////////

    // 좀비는 모두 숨기기
    $(".mz").delay(3000).hide(3000);
    // 시간없는 hide()는 display:none 처리함

    // 2. 버튼 셋팅하기
    // 모든 버튼은 숨기고 첫번째 버튼만 보여
    // 버튼.숨겨().첫번째().보여()
    btns.hide().first().show();

    // 3. 공통함수 : actMini()
    const actMini = (ele,seq,mtxt) => {
        // 전달값 (ele-버튼요소,seq-방순번,mtxt-메시지)
        // 1. 클릭된 버튼 사라지기
        $(ele).slideUp(300);
        // slideUp(시간,이징,함수)
        // 높이값이 0되면서 애니, 0된후 display:none처리함

        // 2. 메시지 없애기 : .msg -> msg변수
        msg.fadeOut(300);
        // fadeOut(시간,이징,함수)
        // 서서히 사라짐, 사라진후 display:none처리됨

        // 3. 메시지 함수 : msgFn() + 다음버튼 보이기
        const msgFn = (txt) => {
            msg.text(txt) // 텍스트 변경
                .fadeIn(300); // 나타나기
            // 다음버튼 보이기
            $(ele).next().delay(500).slideDown(300);
            // slideDown(시간,이징,함수)
            // - 자동으로 원래 높이값복원 애니
            // - 최초상태는 항상 display:none이다
        }; ///// msgFn 함수 ///////////

        // 4. 이동하기
        // 위치: li 8번방 -> bd변수에 모든 li있음
        let pos = [];
        // 대상: li의 몇번째(seq)
        let room = bd.eq(seq);
        // top 위치값
        pos[0] = room.offset().top;
        // left위치값 : 중앙위치보정(+li절반-미니언즈절반)
        pos[1] = room.offset().left + room.width() / 2 - mi.width() / 2;
        //  console.log(pos);

        // 미니언즈 위치이동하기 애니메이션
        // 대상: .mi -> mi변수
        mi.animate(
            {
                top: pos[0] + "px",
                left: pos[1] + "px",
            },
            800,
            "easeOutElastic",
            // 메시지호출:콜백함수
            msgFn(mtxt)
        );
        // animate({CSS설정},시간,이징,함수)
        // 모든 제이쿼리 애니메이션 메서드에는
        // 끝난후 실행함수가 있다.(콜백함수)
    };

    // 4. 들어가기 버튼 클릭시 //////////
    btns.first()
        .click(function () {
            actMini(this,8,"와 아늑하다 옆방으로 가자")
        })
        // 5. 옆방으로! 버튼 클릭시 //////////
        .next()
        .click(function () {
            actMini(this,9,"악 좀비 어서피하자")
        })
    // 6. 윗층으로 도망가! 버튼 클릭시 //////////
    .next()
    .click(function () {
        actMini(this,)
    })
    // 7. 다시옆방으로! 버튼 클릭시 //////////
    .next()
    .click(function () {
        actMini(this,)
    })
    // 8. 무서우니 윗층으로! 버튼 클릭시 //////////
    .next()
    .click(function () {
        actMini(this,)
    })
    // 9. 치료주사방으로! 버튼 클릭시 //////////
    .next()
    .click(function () {
        actMini(this,)
    })
    // 10. 3번방으로! 버튼 클릭시 //////////
    .next()
    .click(function () {
        actMini(this,)
    })
    // 11. 1번방으로! 버튼 클릭시 //////////
    .next()
    .click(function () {
        actMini(this,)
    })
    // 12. 헬기를 호출! 버튼 클릭시 //////////
    .next()
    .click(function () {
        actMini(this,)
    })
}); ////////// JGB ////////////////
