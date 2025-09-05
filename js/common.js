$(document).ready(function () {
    // 이루다 헤더
    // .dropdown 클릭 시 hidden-menu 토글
    $(".dropdown").on("click focus", (e) => {
        e.stopPropagation();
        $(e.currentTarget).find(".hidden-menu").toggleClass("active");
    });

    // 문서 전체 클릭 시 .dropdown 영역 외부 클릭 시 hidden-menu 닫기
    $(document).click((e) => {
        if (!$(e.target).closest(".dropdown").length) {
            $(".hidden-menu").removeClass("active");
        }
    });

    // 사이드 메뉴
    // 접힘/펼침 버튼
    const sideMenuToogleBtn = $(".menu-toggle-btn");

    sideMenuToogleBtn.on("click", () => {
        $(".sidemenu-wrapper").toggleClass("folded");
    });

    // 초기 로드 시 active 클래스가 있으면 열기
    const gnb = $(".sidemenu-wrapper .sm-content .gnb");
    const activeGnb = $(".sidemenu-wrapper .sm-content .gnb.active");

    // 현재 메뉴 보임
    activeGnb.siblings(".lnb").stop().slideDown("fast");

    // 클릭 시 열고 닫기 + 클래스 toggle
    gnb.on("click", (e) => {
        $(e.currentTarget)
            .toggleClass("on")
            .siblings(".lnb")
            .stop()
            .slideToggle("fast");
    });

    // 탭 키로 이동 시 열고 닫기
    let isTab = false;

    $(document).on("keydown keyup", (e) => {
        if (e.key === "Tab") {
            isTab = e.type === "keydown";
        }
    });

    // 마우스 클릭 시 isTab false
    gnb.on("mousedown", () => (isTab = false));

    // focus 시 isTab이 true라면 열기
    gnb.on("focus", (e) => {
        if (isTab && !$(e.currentTarget).hasClass("on")) {
            $(e.currentTarget)
                .addClass("on")
                .siblings(".lnb")
                .stop()
                .slideDown("fast");
        }
    });

    // 메인 컨텐츠
    // 검색
    // 외부영역 클릭 시 레이어 닫기 및 레이어 팝업 활성화
    const $layerBoxWrapper = $(".layer-area");
    const $layerActiveTarget = $(".layer-target");

    // 외부 클릭 시 모든 레이어 닫기
    $(document).on("mouseup", function (e) {
        $layerBoxWrapper.each(function () {
            if (!$(this).has(e.target).length) {
                $(".layer-box").removeClass("show");
            }
        });
    });

    // layer-target에 포커스 시 해당하는 layer-box 열기
    $layerActiveTarget.on("focus", function () {
        // 모든 레이어 닫기
        $(".layer-box").removeClass("show");

        const $parentLayerArea = $(this).closest(".layer-area");
        const targetLayer = $(this).data("layer");

        const targetsInParent = $parentLayerArea.find(".layer-target").length;
        const layersInParent = $parentLayerArea.find(".layer-box").length;

        if (targetsInParent === 1 && layersInParent === 1) {
            // 타겟과 내용이 한 쌍일 경우
            $parentLayerArea.find(".layer-box").addClass("show");
        } else {
            // 여러 개일 경우 data-layer 비교
            $parentLayerArea
                .find(`.layer-box[data-layer="${targetLayer}"]`)
                .addClass("show");
        }
    });

    // 검색 입력값 초기화 버튼 추가
    const searchInput = $(".content-header .search input");
    const resetBtn = $(".content-header .search .reset-btn");

    // 입력 시 버튼 표시 및 입력값 없으면 숨김
    searchInput.on("input", (e) => {
        if ($(e.currentTarget).val().trim() !== "") {
            resetBtn.show();
        } else {
            resetBtn.hide();
        }
    });

    // 버튼 클릭 시 입력값 초기화 및 버튼 숨김
    resetBtn.click(() => {
        searchInput.val("").focus();
        resetBtn.hide();
    });

    // 인기데이터 셋 현황 슬라이드
    function initSlide(
        containerSelector,
        itemSelector,
        itemCount,
        itemHeight,
        intervalTime
    ) {
        const $texts = $(`${containerSelector} ${itemSelector}`);
        let count = 0;

        setInterval(() => {
            count++;
            if (count >= itemCount) count = 0;

            $texts.each(function () {
                $(this).css({
                    transform: `translateY(-${itemHeight * count}px)`,
                    transition: "transform 0.5s ease",
                });
            });
        }, intervalTime);
    }

    initSlide(".rank-slide", ".desc", 7, 36, 3000);
    initSlide(".title-slide", ".text", 7, 19, 3000);

    // 통합검색결과

    // 필터
    $(".filter-con-title").on({
        click(e) {
            $(e.currentTarget).toggleClass("bg");
            $(e.currentTarget)
                .siblings(".filter-content-area")
                .stop(true, true)
                .slideToggle("fast");
        },
        focus(e) {
            let $target = $(e.currentTarget).siblings(".filter-content-area");
            if (!$target.is(":visible"))
                $target.stop(true, true).slideDown("fast");
        },
    });

    // 필터 체크박스
    const filterCheckbox = $(
        '.filter-content .checkbox-group input[type="checkbox"]'
    );
    filterCheckbox.click((e) =>
        $(e.currentTarget).parents(".checkbox-group").toggleClass("active")
    );

    // 내 필터 목록
    $(".saved-filters .con-title").click((e) => {
        const $parent = $(e.currentTarget).parent(".saved-filters");
        $parent
            .toggleClass("active")
            .find(".hidden-list")
            .stop(true, true)
            .slideToggle("fast");
    });

    // 필터 안 토글 버튼
    $(".filter-area .toggle-button").click((e) => {
        const $target = $(e.currentTarget);
        $target
            .toggleClass("active")
            .parents(".filter-content")
            .find(".filter-nested")
            .stop(true, true)
            .slideToggle("fast");
    });

    // 커뮤니티
    $(".chip").click((e) => {
        $(e.currentTarget).toggleClass("active");
    });

    let question = document.querySelectorAll(".faq_wrap .ques");
    for (let el of question) {
        let text = el.querySelector("p").textContent;
        el.setAttribute("data-title", `${text}`);
    }

    for (let el of question) {
        const toggleMenu = () => {
            let isOn = el.parentElement.classList.contains("on");
            let answer = el.nextElementSibling;
            let targetHeight = answer.querySelector("p").offsetHeight;
            answer.style.height = isOn ? `${targetHeight}px` : "0px";
            answer.style.overflow = isOn ? "inherit" : "hidden";
        };

        toggleMenu();

        el.addEventListener("click", (e) => {
            el.parentElement.classList.toggle("on");
            toggleMenu();
        });
    }

    // 알림
    // 탭
    const tabButton = $(".alarm-layer-popup .main-tab-area button");
    tabButton.click((e) => {
        let activeIndex = $(e.currentTarget).index();
        $(".alarm-layer-popup .tab-content")
            .removeClass("active")
            .eq(activeIndex)
            .addClass("active");
        $(e.currentTarget).addClass("active").siblings().removeClass("active");
    });

    // 팝업 닫기
    const popupClose = $(".popup-close");

    popupClose.click((e) => {
        $(e.currentTarget).parents(".alarm-layer-popup").removeClass("is-open");
    });

    // 팝업 열기
    const alarm = $(".link.alarm");

    alarm.click((e) => {
        $(".alarm-layer-popup").toggleClass("is-open");
    });
});
