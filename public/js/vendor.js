(function( $ ) {
	'use strict'; 
	var OptimalSort = {};

	(function () {
        (OptimalSort.CardSort = (function () {
            function e(e) {
                var t, n, i, r;
                (r = e.data("survey-update-url")), ((t = e.data("card-sort")).userIsTouch = $("html.touch").length > 0), (i = new OptimalSort.CardSortStateManager(t, r)), (n = new OptimalSort.CardSortRenderer(e, i, t)), new OptimalSort.CardSortEventManager(e, n, i);
            }
            return (e.CATEGORY_GUTTER = 16), (e.CATEGORY_WIDTH = 260), e;
        })()),
            $(function () {
                return $("*[data-behaviour=cardSort]").each(function () {
                    return new OptimalSort.CardSort($(this));
                });
            });
    })(),
    (function () {
        var e = function (e, t) {
            return function () {
                return e.apply(t, arguments);
            };
        };
        OptimalSort.CardSortEventManager = (function () {
            function t(t, n, i) {
                var r;
                (this.container = t),
                    (this.renderer = n),
                    (this.stateManager = i),
                    (this._embiggenCardImage = e(this._embiggenCardImage, this)),
                    (this._displayInstructionsModal = e(this._displayInstructionsModal, this)),
                    (this._displayInitialInstructions = e(this._displayInitialInstructions, this)),
                    (this._updateComment = e(this._updateComment, this)),
                    (this._commentModalShown = e(this._commentModalShown, this)),
                    (this._displayCommentModal = e(this._displayCommentModal, this)),
                    (this._displayInfoModal = e(this._displayInfoModal, this)),
                    (this._categoryLabelInputKeypress = e(this._categoryLabelInputKeypress, this)),
                    (this._categoryRename = e(this._categoryRename, this)),
                    (this._categoryRenameStart = e(this._categoryRenameStart, this)),
                    (this._submitCardSort = e(this._submitCardSort, this)),
                    (this._stoppedDraggingCard = e(this._stoppedDraggingCard, this)),
                    (this._cardPositionChanged = e(this._cardPositionChanged, this)),
                    (this._cardMovedToAnotherCategory = e(this._cardMovedToAnotherCategory, this)),
                    (this._createNewCategory = e(this._createNewCategory, this)),
                    (this._cardOverCategory = e(this._cardOverCategory, this)),
                    (this._overFullCategory = e(this._overFullCategory, this)),
                    (this._draggingCard = e(this._draggingCard, this)),
                    (this._cardlistChanged = e(this._cardlistChanged, this)),
                    (this._stoppedDraggingCategory = e(this._stoppedDraggingCategory, this)),
                    (this._startedDraggingCategory = e(this._startedDraggingCategory, this)),
                    (this._startedDraggingCard = e(this._startedDraggingCard, this)),
                    (this._deleteCategory = e(this._deleteCategory, this)),
                    (this._toggleCategory = e(this._toggleCategory, this)),
                    (this._onResize = e(this._onResize, this)),
                    (this._toggleDescriptionPopovers = e(this._toggleDescriptionPopovers, this)),
                    (this._objectDropped = e(this._objectDropped, this)),
                    (this._preventOnDrag = e(this._preventOnDrag, this)),
                    $(window).on("resize", this._onResize),
                    (r = "pointerup"),
                    (this.categoryDeleteEventOptions = [r, ".category-delete", this._deleteCategory, this._preventOnDrag]),
                    (this.objectDragging = !1),
                    (this._throttleDraggingCard = _.throttle(this._draggingCard, 150, { trailing: !1 })),
                    (this._throttleCardOverCategory = _.throttle(this._cardOverCategory, 150, { trailing: !1 })),
                    this.container
                        .on(r, this._toggleDescriptionPopovers, this._preventOnDrag)
                        .on("sortstart", ".sortable-category", this._startedDraggingCard)
                        .on("sort", ".sortable-category", this._throttleDraggingCard)
                        .on("sortchange", ".sortable-category", this._cardlistChanged)
                        .on("sortover", ".sortable-category", this._throttleCardOverCategory)
                        .on("sortbeforestop", ".sortable-category", this._createNewCategory)
                        .on("sortreceive", ".sortable-category", this._cardMovedToAnotherCategory)
                        .on("sortupdate", ".sortable-category", this._cardPositionChanged)
                        .on("sortstop", ".sortable-category", this._stoppedDraggingCard)
                        .on("dragstart", ".cs-grid", this._startedDraggingCategory)
                        .on("dragstop", ".cs-grid", this._stoppedDraggingCategory)
                        .on(r, ".category-minimise", this._toggleCategory, this._preventOnDrag)
                        .on(r, ".category-rename", this._categoryRenameStart, this._preventOnDrag)
                        .on.apply(this.container, this.categoryDeleteEventOptions)
                        .on("blur", ".category-label-input", this._categoryRename)
                        .on("keydown", ".category-label-input", this._categoryLabelInputKeypress)
                        .on(r, ".embiggen-img", this._embiggenCardImage, this._preventOnDrag)
                        .on("click", ".cs-logo", this._displayInfoModal)
                        .on("click", ".cs-instructions-btn", this._displayInstructionsModal)
                        .on("click", ".cs-comment-btn", this._displayCommentModal)
                        .on("click", ".cs-comment-submit", this._updateComment)
                        .on("click", ".cs-submit", this._submitCardSort)
                        .on("shown.bs.modal", "#commentModal", this._commentModalShown)
                        .on("hide.bs.modal", "#cintInstructionsModal", this._displayInitialInstructions),
                    this.container.find("img").on("load", this._cardlistChanged),
                    (this.newCategoryCreated = !1),
                    (this.outOfCategory = !1);
            }
            return (
                (t.ENTER_KEYCODE = 13),
                (t.prototype._preventOnDrag = function (e) {
                    var t;
                    return !this.objectDragging && ((t = e.data), _.isFunction(t) && t.apply(this, arguments));
                }),
                (t.prototype._objectDropped = function () {
                    return setTimeout(
                        ((e = this),
                        function () {
                            return (e.objectDragging = !1);
                        }),
                        0
                    );
                    var e;
                }),
                (t.prototype._toggleDescriptionPopovers = function (e) {
                    var t;
                    return (t = $(e.target)), this.renderer.toggleDescriptionPopovers(t);
                }),
                (t.prototype._onResize = function () {
                    return this.renderer.handleWindowResize();
                }),
                (t.prototype._toggleCategory = function (e) {
                    var t;
                    return (t = $(e.target).closest(".sortable-category")), this.renderer.toggleCategory(t);
                }),
                (t.prototype._deleteCategory = function (e) {
                    var t, n;
                    return (t = $(e.target).closest(".sortable-category")), (n = this._categoryLabel(t)), this.stateManager.deleteCategory(n), this.renderer.removeCategory(t);
                }),
                (t.prototype._startedDraggingCard = function (e, t) {
                    var n;
                    return (
                        (this.objectDragging = !0),
                        (n = $(e.target).closest(".sortable-category")),
                        this.renderer.categoryNoLongerFull(n),
                        this.renderer.blurFocusedCategoryLabel(),
                        this.renderer.hideTutorialStep(),
                        this.renderer.setPlaceholderHeight(t),
                        this.renderer.hideDescriptionPopovers(),
                        (this.newCategoryCreated = !1),
                        !0
                    );
                }),
                (t.prototype._startedDraggingCategory = function (e, t) {
                    try {
                        $(e.target).draggable("widget").addClass("no-transition").css({ visibility: "hidden" });
                    } catch (n) {
                        return void n;
                    }
                    return (this.objectDragging = !0), this.renderer.blurFocusedCategoryLabel(), this.renderer.hideDescriptionPopovers(), t.helper.addClass("no-animation");
                }),
                (t.prototype._stoppedDraggingCategory = function (e) {
                    return $(e.target).draggable("widget").css({ visibility: "visible" }), this._objectDropped(), this.renderer.updateTutorialInstructions();
                }),
                (t.prototype._cardlistChanged = function () {
                    return this.renderer.shiftLayout();
                }),
                (t.prototype._draggingCard = function (e, t) {
                    var n;
                    return (
                        this.outOfCategory || this.renderer.hoveringOverCategory(e.clientX, e.clientY)
                            ? (n = this.renderer.findHoveringOverFullCategory(e.clientX, e.clientY)) && this._overFullCategory($(n))
                            : ((this.outOfCategory = !0), this.renderer.cardOutCategory(), this.renderer.moveTempCategory(e.clientX, e.clientY), this.renderer.notHoveringOverFullCategory()),
                        this.renderer.hoveringInStageBounds(e.clientX, e.clientY) || this._throttleCardOverCategory(),
                        this.renderer.hoveringOverTempCategory(e.clientX, e.clientY) || this.renderer.moveTempCategory(e.clientX, e.clientY),
                        this.renderer.updateScrollContainer(e, t)
                    );
                }),
                (t.prototype._overFullCategory = function (e) {
                    return this._throttleCardOverCategory(), this.renderer.hoveringOverFullCategory(e);
                }),
                (t.prototype._cardOverCategory = function () {
                    return (this.outOfCategory = !1), this.renderer.cardOverCategory(), this.renderer.notHoveringOverFullCategory();
                }),
                (t.prototype._createNewCategory = function (e, t) {
                    var n, i;
                    if (this.outOfCategory && !this.stateManager.isClosedSort())
                        return (
                            this._objectDropped(),
                            (n = $(t.item).attr("id")),
                            (i = this.stateManager.newCategory()),
                            this.stateManager.addCardToCategory(n, i.label),
                            this.renderer.removeCard(n),
                            this.renderer.removeTempCategory(),
                            this.renderer.renderNewCategory(i, e.clientX, e.clientY),
                            this.renderer.updateCategoryCardCounts(),
                            this.renderer.updateCardsUnsorted(),
                            this._removeEmptyUnnamedCategory($(e.target)),
                            (this.newCategoryCreated = !0)
                        );
                }),
                (t.prototype._cardMovedToAnotherCategory = function (e, t) {
                    var n, i, r, o, a;
                    if (((n = $(e.target)).find(".cardlist").append(n.find(".dummy-card")), !this.newCategoryCreated))
                        return (
                            (o = t.item.index()),
                            (i = t.item.attr("id")),
                            n.hasClass("cs-unsorted") ? this.stateManager.moveCardToUnsorted(i, o) : ((r = this._categoryLabel(n)), this.stateManager.moveCardToCategory(i, r, o)),
                            (a = t.sender),
                            this._removeEmptyUnnamedCategory(a),
                            this.renderer.updateCategoryCardCounts()
                        );
                }),
                (t.prototype._cardPositionChanged = function (e, t) {
                    var n, i;
                    return this._objectDropped(), (i = t.item.index()), (n = t.item.attr("id")), this.stateManager.shiftCardPosition(n, i), this.renderer.updateCardsUnsorted(), this.renderer.updateCardPositions();
                }),
                (t.prototype._stoppedDraggingCard = function () {
                    return this._objectDropped(), this.renderer.notHoveringOverFullCategory(), this.renderer.updateTutorialInstructions(), this.renderer.updateCategoryCardCounts();
                }),
                (t.prototype._submitCardSort = function () {
                    return this.stateManager.canSubmitCardSort()
                        ? (this.renderer.displaySpinner(),
                          this.stateManager
                              .finalSave()
                              .done(function () {
                                  return $("#submitCardSortForm").submit();
                              })
                              .fail(
                                  ((e = this),
                                  function (t, n) {
                                      return "undefined" != typeof _StatHat && null !== _StatHat && _StatHat.push(["_trackCount", "_ueKlbyEUM8yRpu7A43NbCBBT21D", 1]), e.renderer.submitErrorModal(t, n);
                                  })
                              ))
                        : this.renderer.displayErrorModal();
                    var e;
                }),
                (t.prototype._categoryRenameStart = function (e) {
                    var t, n;
                    return (t = $(e.target).closest(".category")), this.renderer.startCategoryRename(t), (n = _.without(this.categoryDeleteEventOptions, this.categoryDeleteEventOptions[2])), this.container.off.apply(this.container, n);
                }),
                (t.prototype._categoryRename = function (e) {
                    var t, n, i, r, o;
                    return (
                        (o = (r = $(e.target)).val()),
                        (t = r.closest(".category")),
                        (n = this._categoryLabel(t)),
                        (i = this.stateManager.renameCategory(n, o)),
                        this.renderer.updateCategoryLabel(i),
                        this._removeEmptyUnnamedCategory(t),
                        this.container.on.apply(this.container, this.categoryDeleteEventOptions)
                    );
                }),
                (t.prototype._categoryLabelInputKeypress = function (e) {
                    if (e.keyCode === t.ENTER_KEYCODE) return this.renderer.blurFocusedCategoryLabel();
                }),
                (t.prototype._categoryLabel = function (e) {
                    return e.find(".category-header").data("label");
                }),
                (t.prototype._removeEmptyUnnamedCategory = function (e) {
                    var t;
                    if (!e.hasClass("cs-unsorted")) return (t = this._categoryLabel(e)), this.stateManager.deleteEmptyUnnamedCategory(t) ? this.renderer.removeCategory(e) : void 0;
                }),
                (t.prototype._displayInfoModal = function () {
                    return this.renderer.displayInfoModal();
                }),
                (t.prototype._displayCommentModal = function () {
                    return this.renderer.displayCommentModal();
                }),
                (t.prototype._commentModalShown = function () {
                    return this.renderer.focusCommentModalInput();
                }),
                (t.prototype._updateComment = function () {
                    return this.renderer.hideCommentModal(), this.stateManager.updateComment(this.container.find(".cs-comment-text").val());
                }),
                (t.prototype._displayInitialInstructions = function () {
                    return this.renderer.displayInitialInstructions();
                }),
                (t.prototype._displayInstructionsModal = function () {
                    return this.renderer.displayInstructionsModal();
                }),
                (t.prototype._embiggenCardImage = function (e) {
                    var t;
                    return (t = $(e.target).closest(".card")), this.renderer.embiggenCardImage(t);
                }),
                t
            );
        })();
    }).call(this),
    (function () {
        var e = function (e, t) {
            return function () {
                return e.apply(t, arguments);
            };
        };
        OptimalSort.CardSortRenderer = (function () {
            function t(t, n, i) {
                (this.container = t),
                    (this.stateManager = n),
                    (this.data = i),
                    (this.hoveringOverTempCategory = e(this.hoveringOverTempCategory, this)),
                    (this._instructionMarginTop = e(this._instructionMarginTop, this)),
                    this._loadTemplates(),
                    this._renderUnsortedCards(),
                    this.updateCardsUnsorted(),
                    this._updateSortHeight(),
                    this._renderCategories(),
                    this._setupCategoryLayout(),
                    this._initDescriptionPopovers(),
                    this.displayInitialInstructions(),
                    this._renderComment(),
                    this._renderCustomColor(),
                    $("#cardSortJsonTextarea").on("click", function () {
                        return this.select();
                    });
            }
            return (
                (t.prototype._loadTemplates = function () {
                    return (
                        (this.categoryTemplate = this.container.find(".category-template-partial").html()),
                        (this.tempCategoryTemplate = this.container.find(".temp-category-template-partial").html()),
                        (this.cardListTemplate = this.container.find(".card-list-template-partial").html()),
                        (this.templates = { category: this.categoryTemplate, cardList: this.cardListTemplate, tempCategory: this.tempCategoryTemplate })
                    );
                }),
                (t.prototype._renderCustomColor = function () {
                    return (
                        this.color || (this.color = sanitizeHexColor(this.data.custom_color)),
                        this.contrastColor || (this.contrastColor = getContrastYIQ(this.color)),
                        $(".cs-header").css("border-color", this.color),
                        $(".btn-custom, .card-pos").css({ "background-color": this.color, color: this.contrastColor }),
                        $(".btn-custom").css({ border: "1px solid", "border-color": this.color, color: this.contrastColor })
                    );
                }),
                (t.prototype._renderUnsortedCards = function () {
                    var e;
                    return (
                        (e = this.stateManager.unsortedCategory.cards),
                        this.container
                            .find(".cs-unsorted")
                            .html(Mustache.render(this.cardListTemplate, { cards: e }))
                            .sortable(this._cardSortOptions())
                    );
                }),
                (t.prototype._renderCategories = function () {
                    var e;
                    return (
                        _.each(
                            this.stateManager.categories,
                            ((e = this),
                            function (t) {
                                return e._renderCategory(t);
                            })
                        ),
                        this.updateCategoryCardCounts()
                    );
                }),
                (t.prototype._categoryUnnamedLabel = function () {
                    return this.stateManager.userIsTouch ? i18next.t("label.rename_tap") : i18next.t("label.rename_click");
                }),
                (t.prototype._renderCategory = function (e) {
                    var t;
                    return (
                        (t = $(Mustache.render(this.categoryTemplate, e, this.templates))).find(".category-label-unnamed").text(this._categoryUnnamedLabel()),
                        this.container.find(".cs-grid").append(t),
                        t.sortable(this._cardSortOptions()),
                        (e.view = t)
                    );
                }),
                (t.prototype.renderNewCategory = function (e, t, n) {
                    var i;
                    return (
                        (i = this._renderCategory(e)).draggable(this._categoryDraggableOptions()),
                        this.grid.packery("bindUIDraggableEvents", i),
                        this.grid.packery("addItems", i),
                        this._movePackeryItem(i[0], t, n),
                        this._initDescriptionPopovers(),
                        this._renderCustomColor()
                    );
                }),
                (t.prototype.removeCard = function (e) {
                    return this.container.find(".card#" + e).remove();
                }),
                (t.prototype.removeCategory = function (e) {
                    return (
                        this.hideDescriptionPopovers(),
                        this.grid.packery("remove", e),
                        this.shiftLayout(),
                        this._renderUnsortedCards(),
                        this._renderCustomColor(),
                        this._initDescriptionPopovers(),
                        this.updateCardsUnsorted(),
                        this.updateTutorialInstructions()
                    );
                }),
                (t.prototype.startCategoryRename = function (e) {
                    return (
                        e.find(".category-label").hide(),
                        e.find(".category-label-unnamed").hide(),
                        e.find(".category-label-input").show().select(),
                        this.container.find(".sortable-category").sortable("disable"),
                        this.container.find(".category").draggable("disable"),
                        this.shiftLayout(),
                        this.hideTutorialStep()
                    );
                }),
                (t.prototype.updateCategoryLabel = function (e) {
                    var t, n, i, r;
                    return (
                        this.container.find(".sortable-category").sortable("enable"),
                        this.container.find(".category").draggable("enable"),
                        (t = e.view).find(".category-header").data("label", e.label),
                        (i = t.find(".category-label")),
                        (n = t.find(".category-label-input")),
                        (r = t.find(".category-label-unnamed")),
                        i.text(e.label),
                        n.hide(),
                        e.unnamed ? r.show() : (i.show(), n.val(e.label)),
                        this.shiftLayout(),
                        this.updateTutorialInstructions()
                    );
                }),
                (t.prototype.blurFocusedCategoryLabel = function () {
                    return this.container.find(".category-label-input:focus").blur();
                }),
                (t.prototype._renderTempCategory = function () {
                    var e, t;
                    if (!(this._tempCategory().length > 0 || this.stateManager.isClosedSort()))
                        return (e = i18next.t("label.new_group")), (t = $(Mustache.render(this.tempCategoryTemplate, { label: e }))), this.grid.append(t).packery("addItems", t), t.find(".cardlist").height($(".ui-sortable-helper").height());
                }),
                (t.prototype._tempCategory = function () {
                    return this.container.find(".temp-category");
                }),
                (t.prototype.removeTempCategory = function () {
                    return this.grid.packery("remove", this._tempCategory()), this.shiftLayout(), this._refreshSortablePositions();
                }),
                (t.prototype.moveTempCategory = function (e, t) {
                    return this._movePackeryItem(this._tempCategory()[0], e, t);
                }),
                (t.prototype._movePackeryItem = function (e, t, n) {
                    return (
                        (t -= this.grid.offset().left),
                        (t -= t % OptimalSort.CardSort.CATEGORY_WIDTH),
                        (n -= this.grid.offset().top),
                        this.grid.packery("fit", e, t, n),
                        $(e).one(
                            "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                            ((i = this),
                            function () {
                                return i._refreshSortablePositions();
                            })
                        )
                    );
                    var i;
                }),
                (t.prototype.cardOverCategory = function () {
                    return this.container.find(".card-placeholder").show(), this.removeTempCategory();
                }),
                (t.prototype.cardOutCategory = function () {
                    return this.container.find(".card-placeholder").hide(), this._renderTempCategory();
                }),
                (t.prototype._cardSortOptions = function () {
                    return { connectWith: ".sortable-category:not(.is-full)", placeholder: "card-placeholder", tolerance: "pointer", scroll: !1, delay: 150, items: "li", helper: "clone", appendTo: document.body };
                }),
                (t.prototype._categoryDraggableOptions = function () {
                    return { delay: 150, helper: "clone", appendTo: ".cs-stage", scrollSpeed: 5 };
                }),
                (t.prototype.hoveringOverFullCategory = function (e) {
                    return e.addClass("is-full-mouseover");
                }),
                (t.prototype.notHoveringOverFullCategory = function () {
                    return this.container.find(".category").removeClass("is-full-mouseover");
                }),
                (t.prototype.categoryNoLongerFull = function (e) {
                    return e.removeClass("is-full");
                }),
                (t.prototype._setupCategoryLayout = function () {
                    var e;
                    return (
                        (this.grid = this.container.find(".cs-grid").packery({ itemSelector: ".category", columnWidth: ".category-width", gutter: OptimalSort.CardSort.CATEGORY_GUTTER, transitionDuration: "0" })),
                        (e = this.grid.find(".category").draggable(this._categoryDraggableOptions())),
                        this.grid.packery("bindUIDraggableEvents", e)
                    );
                }),
                (t.prototype.updateCardsUnsorted = function () {
                    var e, t, n, i;
                    if (this.data.display_unsorted_cards_progress)
                        return (
                            (i = this.stateManager.unsortedCardCount()),
                            (n = this.stateManager.totalPercentUnsorted()),
                            (e = i18next.t("label.cards_unsorted", { n: i, total: this.stateManager.cards.length })),
                            (t = this.container.find(".sort-progress")).find(".bar-inner").width(n + "%"),
                            t.find(".sort-progress-label").text(e)
                        );
                }),
                (t.prototype.updateCategoryCardCounts = function () {
                    return _.each(this.stateManager.categories, function (e) {
                        var t, n, i;
                        return (
                            (t = e.cardCount()),
                            (n = (i = e.cardLimit) ? i18next.t("label.card_limit_count", { n: t, limit: i }) : i18next.t("label.card_count", { n: t, count: t })),
                            e.view.find(".category-count").text(n),
                            e.view.toggleClass("is-full", e.cardListIsFull())
                        );
                    });
                }),
                (t.prototype.updateCardPositions = function () {
                    var e, t;
                    return (
                        (e = this.stateManager.cards),
                        _.each(
                            e,
                            ((t = this),
                            function (e) {
                                return t.container.find("#" + e.id + ".card .card-pos").text(e.position);
                            })
                        )
                    );
                }),
                (t.prototype._renderComment = function () {
                    return this.container.find(".cs-comment-text").val(this.stateManager.comment);
                }),
                (t.prototype._updateSortHeight = function () {
                    var e, t;
                    return (t = $(window).height()), (e = this.container.find(".cs-header").outerHeight()), this.container.find(".cs-wrap").height(t - e);
                }),
                (t.prototype.updateScrollContainer = function (e, t) {
                    var n, i, r, o, a;
                    if ("undefined" != typeof (r = t.placeholder.scrollParent())[0].offsetTop)
                        return (
                            (a = r.offset().top),
                            (n = r.height() + a),
                            (i = e.clientY) < a + (o = 20) ? r.scrollTop(r.scrollTop() - t.item.height()) : i > n - o && r.scrollTop(r.scrollTop() + t.item.height()),
                            this._refreshSortablePositions()
                        );
                }),
                (t.prototype._refreshSortablePositions = function () {
                    return this.container.find(".sortable-category").sortable("refreshPositions");
                }),
                (t.prototype.setPlaceholderHeight = function (e) {
                    return e.placeholder.height(e.helper.height());
                }),
                (t.prototype._initDescriptionPopovers = function () {
                    // return this.container.find(".cardsort-desc").popover({
                    //     html: !0,
                    //     container: "body",
                    //     trigger: "manual",
                    //     placement: "right auto",
                    //     _blurFocusedCategoryLabel:
                    //         ((e = this),
                    //         function () {
                    //             return e.container.find(".category-label-input:focus").blur();
                    //         }),
                    // });
                    var e;
                }),
                (t.prototype.toggleDescriptionPopovers = function (e) {
                    return $(".cardsort-desc").each(function () {
                        var t;
                        return (t = $(this)).is(e) ? t.popover("toggle") : t.popover("hide");
                    });
                }),
                (t.prototype.hideDescriptionPopovers = function () {
                    return $(".cardsort-desc").popover("hide");
                }),
                (t.prototype.handleWindowResize = function () {
                    return this.hideDescriptionPopovers(), this._updateSortHeight();
                }),
                (t.prototype.toggleCategory = function (e) {
                    return e.toggleClass("is-minimised"), this.shiftLayout();
                }),
                (t.prototype.displaySpinner = function () {
                    return this.container.find(".cs-submit").attr("disabled", !0), bootbox.dialog({ message: '<i class="fa fa-spinner fa-spin"></i>', className: "modal-block-n-load", closeButton: !1, onEscape: !1 });
                }),
                (t.prototype.hideSpinner = function () {
                    return this.container.find(".cs-submit").attr("disabled", !1), bootbox.hideAll();
                }),
                (t.prototype.displayErrorModal = function () {
                    var e, t;
                    return (
                        (e = this.stateManager.errorMessages()),
                        (t = $.map(e, function (e) {
                            return "<p>" + e + "</p>";
                        })),
                        bootbox.alert({ message: t, closeButton: !1, buttons: { ok: { label: i18next.t("button.okay"), className: "btn-custom" } } }),
                        this._renderCustomColor()
                    );
                }),
                (t.prototype.embiggenCardImage = function (e) {
                    var t, n, i;
                    return (
                        (n = (t = e.find(".card-img")).attr("src")),
                        (i = e.find("#" + t.attr("id")).prop("naturalWidth")),
                        bootbox
                            .dialog({ message: "<img src='" + n + "'>", className: "cs-modal-image", backdrop: !0, onEscape: !0 })
                            .find(".modal-dialog")
                            .width(i + 30)
                    );
                }),
                (t.prototype.displayInfoModal = function () {
                    return this.container.find("#aboutModal").modal("show");
                }),
                (t.prototype.displayCommentModal = function () {
                    return this.container.find("#commentModal").modal("show");
                }),
                (t.prototype.hideCommentModal = function () {
                    return this.container.find("#commentModal").modal("hide");
                }),
                (t.prototype.focusCommentModalInput = function () {
                    return this.container.find("#commentModal").find(".cs-comment-text").focus();
                }),
                (t.prototype.shiftLayout = function () {
                    return this.grid.packery("shiftLayout");
                }),
                (t.prototype.submitErrorModal = function (e, t) {
                    return $("#errorSubmittingSortModal").modal(), $("#cardSortErrorResponse").text(e), $("#cardSortJsonTextarea").val(JSON.stringify(t)), this.hideSpinner();
                }),
                (t.prototype.displayInitialInstructions = function () {
                    return this.data.panel_participant && !this.cintInstructionsShown
                        ? (this._displayCintInstructions(), (this.cintInstructionsShown = !0))
                        : this.data.skip_instructions
                        ? void 0
                        : this.stateManager.isHybridSort() || this.stateManager.isClosedSort()
                        ? this.displayInstructionsModal()
                        : this.updateTutorialInstructions();
                }),
                (t.prototype._displayCintInstructions = function () {
                    return this.container.find("#cintInstructionsModal").modal("show");
                }),
                (t.prototype.displayInstructionsModal = function () {
                    return this.container.find("#instructionsModal").modal("show");
                }),
                (t.prototype.hideTutorialStep = function () {
                    return this.container.find(".tutorial-step").fadeOut(100);
                }),
                (t.prototype.updateTutorialInstructions = function () {
                    var e, t;
                    if (!this.data.skip_instructions && this.stateManager.isOpenSort())
                        if ((this.container.find(".tutorial-step").hide(), (e = this.container.find(".tutorial-step-1")), (t = this.container.find(".tutorial-step-2")), this.stateManager.sortedCardCount() < 1)) {
                            if ((e.css("margin-top", this._instructionMarginTop()), e.text().trim().length)) return e.fadeIn(500);
                        } else if ((1 === this.stateManager.sortedCardCount() || 1 === this.stateManager.categoryCount()) && (t.css("margin-top", this._instructionMarginTop()), t.text().trim().length)) return t.fadeIn(500);
                }),
                (t.prototype._instructionMarginTop = function () {
                    var e;
                    return (
                        (e = _.map(this.container.find(".category"), function (e) {
                            return (e = $(e)).outerHeight() + e.offset().top;
                        })),
                        _.max(e) + OptimalSort.CardSort.CATEGORY_GUTTER - this.container.find(".cs-stage").offset().top
                    );
                }),
                (t.prototype.hoveringOverTempCategory = function (e, t) {
                    var n, i, r, o, a, s;
                    return (
                        0 !== (a = this.container.find(".temp-category")).length &&
                        ((s = (r = a.offset()).top), (i = r.left), (n = a.outerHeight() + s), (o = a.outerWidth() + i), e >= i && e <= o && t > s - OptimalSort.CardSort.CATEGORY_GUTTER && t < n + OptimalSort.CardSort.CATEGORY_GUTTER)
                    );
                }),
                (t.prototype.hoveringOverCategory = function (e, t) {
                    return _.some(
                        this.container.find(".sortable-category"),
                        ((n = this),
                        function (i) {
                            return n._hoveringOverSpecificCategory(e, t, i);
                        })
                    );
                    var n;
                }),
                (t.prototype.findHoveringOverFullCategory = function (e, t) {
                    return _.find(
                        this.container.find(".category.is-full"),
                        ((n = this),
                        function (i) {
                            return n._hoveringOverSpecificCategory(e, t, i);
                        })
                    );
                    var n;
                }),
                (t.prototype.hoveringInStageBounds = function (e, t) {
                    var n, i, r, o, a, s;
                    return (s = (r = (a = this.container.find(".cs-stage")).offset()).top), (i = r.left), (n = a.outerHeight() + s), (o = a.outerWidth() + i), e >= i && e <= o && t >= s && t <= n;
                }),
                (t.prototype._hoveringOverSpecificCategory = function (e, t, n) {
                    var i, r, o, a, s, l;
                    return (l = (a = (i = $(n)).offset()).top), (o = a.left), (r = i.outerHeight() + l), (s = i.outerWidth() + o), e >= o - OptimalSort.CardSort.CATEGORY_GUTTER / 2 && e < s + OptimalSort.CardSort.CATEGORY_GUTTER / 2 && t > l && t < r;
                }),
                t
            );
        })();
    }).call(this),
    (function () {
        var e,
            t,
            n,
            i = function (e, t) {
                function n() {
                    this.constructor = e;
                }
                for (var i in t) r.call(t, i) && (e[i] = t[i]);
                return (n.prototype = t.prototype), (e.prototype = new n()), (e.__super__ = t.prototype), e;
            },
            r = {}.hasOwnProperty;
        (OptimalSort.CardSortStateManager = (function () {
            function i(e, t) {
                (this.data = e),
                    this._loadData(),
                    this._enforceFeatureAvailability(),
                    (this.updater = new OptimalSort.CardSortUpdater(this, t)),
                    (this.debounceSave = _.debounce(function () {
                        return this.updater.requestUpdate();
                    }, 100));
            }
            return (
                (i.unnamedCategoryLabel = "unnamed category"),
                (i.unsortedCategoryLabel = "unsorted"),
                (i.prototype.updateComment = function (e) {
                    return (this.comment = e), this.save();
                }),
                (i.prototype.findCards = function (e) {
                    return _.map(
                        e,
                        ((t = this),
                        function (e) {
                            return t.findCard(e);
                        })
                    );
                    var t;
                }),
                (i.prototype.findCard = function (e) {
                    return (
                        "string" == typeof e && (e = parseInt(e, 10)),
                        _.find(this.cards, function (t) {
                            return t.id === e;
                        })
                    );
                }),
                (i.prototype.findCategory = function (e) {
                    return (
                        (e = e.toString()),
                        _.find(this.categories, function (t) {
                            return t.label === e;
                        })
                    );
                }),
                (i.prototype.unsortedCardCount = function () {
                    return this.unsortedCategory.cardCount();
                }),
                (i.prototype.sortedCardCount = function () {
                    return this.totalCardsCount() - this.unsortedCardCount();
                }),
                (i.prototype.totalPercentUnsorted = function () {
                    return (this.unsortedCardCount() / this.totalCardsCount()) * 100;
                }),
                (i.prototype.categoryCount = function () {
                    return this.categories.length;
                }),
                (i.prototype.totalCardsCount = function () {
                    return this.cards.length;
                }),
                (i.prototype.deleteCategory = function (e) {
                    var t, n, i;
                    if (!(t = this.findCategory(e)).predefined)
                        return (
                            (n = _.clone(t.cards)),
                            _.each(
                                n,
                                ((i = this),
                                function (e) {
                                    return i._addCardToUnsorted(e.id);
                                })
                            ),
                            _.remove(this.categories, t),
                            this.save()
                        );
                }),
                (i.prototype.isEmptyUnnamedCategory = function (e) {
                    var t;
                    return (t = this.findCategory(e)).unnamed && 0 === t.cardCount();
                }),
                (i.prototype.deleteEmptyUnnamedCategory = function (e) {
                    var t;
                    return (t = this.isEmptyUnnamedCategory(e)) && this.deleteCategory(e), t;
                }),
                (i.prototype.moveCardToCategory = function (e, t, n) {
                    var i, r;
                    return (i = this.findCard(e)), (r = this.findCategory(t)), this._moveCard(i, r, n);
                }),
                (i.prototype.addCardToCategory = function (e, t) {
                    return this.moveCardToCategory(e, t, 0);
                }),
                (i.prototype.moveCardToUnsorted = function (e, t) {
                    var n;
                    return (n = this.findCard(e)), this._moveCard(n, this.unsortedCategory, t);
                }),
                (i.prototype.shiftCardPosition = function (e, t) {
                    var n;
                    return (n = this.findCard(e)), this._findCardCategory(n).shiftCard(n, t), this.save();
                }),
                (i.prototype.newCategory = function () {
                    var e;
                    return (e = new t({ label: this._generateUniqueCategoryLabel(i.unnamedCategoryLabel), unnamed: !0 })), this.categories.push(e), e;
                }),
                (i.prototype.renameCategory = function (e, t) {
                    var n, r;
                    return (
                        (t = _.trim(t)),
                        (n = this.findCategory(e)),
                        (r = _.startsWith(t, i.unnamedCategoryLabel) || t === i.unsortedCategoryLabel),
                        e === t || n.predefined || r
                            ? n
                            : (("" !== t && 0 !== t.length) || (t = i.unnamedCategoryLabel), (n.label = ""), (n.label = this._generateUniqueCategoryLabel(t)), (n.unnamed = _.startsWith(n.label, i.unnamedCategoryLabel)), this.save(), n)
                    );
                }),
                (i.prototype.errorMessages = function () {
                    var e, t;
                    return (
                        (e = []),
                        (t = _.filter(this.categories, function (e) {
                            return e.unnamed;
                        })),
                        this.data.require_categories_named && t.length > 0 && e.push(i18next.t("os_message.groups")),
                        this.data.require_cards_sorted && this.unsortedCategory.cardCount() > 0 && e.push(i18next.t("os_message.cards")),
                        e
                    );
                }),
                (i.prototype.save = function () {
                    return this.debounceSave();
                }),
                (i.prototype.saveImmediately = function () {
                    return this.updater.update();
                }),
                (i.prototype.finalSave = function () {
                    return this.updater.update({ final: 1 });
                }),
                (i.prototype.cardSortJson = function () {
                    var e, t;
                    return (
                        (e = { cardsort: {} }),
                        this.unsortedCategory.cards.length > 0 && (e.cardsort.unsorted = this.unsortedCategory.cardIds()),
                        _.each(
                            this.categories,
                            ((t = this),
                            function (n) {
                                var i;
                                if (((i = t.isClosedSort() ? "category-" + n.id : _.unescape(n.label)), n.cards.length > 0)) return (e.cardsort[i] = n.cardIds());
                            })
                        ),
                        (e.comment = this.comment),
                        JSON.stringify(e)
                    );
                }),
                (i.prototype.canSubmitCardSort = function () {
                    return 0 === this.errorMessages().length;
                }),
                (i.prototype.isClosedSort = function () {
                    return "closed" === this.data.type;
                }),
                (i.prototype.isHybridSort = function () {
                    return "hybrid" === this.data.type;
                }),
                (i.prototype.isOpenSort = function () {
                    return "open" === this.data.type;
                }),
                (i.prototype._loadData = function () {
                    return (
                        (this.cards = _.map(this.data.cards, function (t) {
                            return new e(t);
                        })),
                        _.remove(this.data.categories, function (e) {
                            return e.label === i.unsortedCategoryLabel;
                        }),
                        this.data.saved_data ? (this._loadCategoriesFromSavedSort(), this._loadCommentFromSavedSort()) : this._loadCategoriesFromNewSort(),
                        (this.userIsTouch = this.data.userIsTouch)
                    );
                }),
                (i.prototype._loadCategoriesFromSavedSort = function () {
                    var e, r, o, a, s, l, u;
                    return (
                        (o = _.reject(this.data.saved_data.sort, function (e) {
                            return e.label === i.unsortedCategoryLabel;
                        })),
                        (a = _.mapValues(o, "label")),
                        (r = _.reject(this._predefinedCategories(), function (e) {
                            return _.includes(a, e.label);
                        })),
                        (e = $.merge(o, r)),
                        (this.categories = _.map(
                            e,
                            ((u = this),
                            function (e) {
                                return (e.unnamed = _.startsWith(e.label, i.unnamedCategoryLabel)), (e.cards = u.findCards(e.cards)), new t(e);
                            })
                        )),
                        (s =
                            null !=
                            (l = _.find(this.data.saved_data.sort, function (e) {
                                return e.label === i.unsortedCategoryLabel;
                            }))
                                ? this.findCards(l.cards)
                                : []),
                        (this.unsortedCategory = new n({ cards: s }))
                    );
                }),
                (i.prototype._loadCategoriesFromNewSort = function () {
                    return (this.categories = this._predefinedCategories()), (this.unsortedCategory = new n({ cards: _.clone(this.cards) }));
                }),
                (i.prototype._loadCommentFromSavedSort = function () {
                    return (this.comment = this.data.saved_data.comment);
                }),
                (i.prototype._predefinedCategories = function () {
                    return _.map(this.data.categories, function (e) {
                        return (e.predefined = !0), new t(e);
                    });
                }),
                (i.prototype._enforceFeatureAvailability = function () {
                    var e;
                    return (
                        _.each(
                            this.cards,
                            ((e = this),
                            function (t) {
                                if ((e.data.cards_with_descriptions || (t.description = null), e.data.cards_with_images || (t.imageUrl = null), e.data.hide_labels && t.imageUrl && (t.label = null), !e.data.cards_with_positions))
                                    return (t.position = null);
                            })
                        ),
                        _.each(
                            this.categories,
                            (function (e) {
                                return function (t) {
                                    if ((e.data.categories_with_card_limits || (t.cardLimit = null), !e.data.categories_with_descriptions)) return (t.description = null);
                                };
                            })(this)
                        )
                    );
                }),
                (i.prototype._findCardCategory = function (e) {
                    return (
                        _.find(this.categories, function (t) {
                            return _.includes(t.cards, e);
                        }) || this.unsortedCategory
                    );
                }),
                (i.prototype._addCardToUnsorted = function (e) {
                    var t;
                    return (t = this.unsortedCategory.cardCount()), this.moveCardToUnsorted(e, t);
                }),
                (i.prototype._moveCard = function (e, t, n) {
                    return this._findCardCategory(e).removeCard(e), t.insertCard(e, n), this.save();
                }),
                (i.prototype._duplicateCategoryLabel = function (e) {
                    return _.includes(_.mapValues(this.categories, "label"), e);
                }),
                (i.prototype._generateUniqueCategoryLabel = function (e) {
                    var t, n, i, r;
                    if (!this._duplicateCategoryLabel(e)) return e;
                    for (t = null === (t = /-\d+$/.exec(e)) ? e.length : t.index, n = e.substring(0, t), r = 1; ; ) {
                        if (((i = n + "-" + r), !this._duplicateCategoryLabel(i))) return i;
                        r++;
                    }
                }),
                i
            );
        })()),
            (e = (function () {
                function e(e) {
                    (this.id = parseInt(e.id, 10)), (this.description = e.description), (this.imageUrl = e.image_url), (this.label = e.label), (this.position = parseInt(e.position, 10) + 1);
                }
                return e;
            })()),
            (t = (function () {
                function e(e) {
                    (this.id = parseInt(e.id, 10)),
                        (this.cards = e.cards || []),
                        (this.predefined = e.predefined || !1),
                        (this.label = e.label),
                        (this.cardLimit = e.card_limit),
                        (this.description = e.description),
                        (this.unnamed = e.unnamed || !1),
                        this._updateCardPositions();
                }
                return (
                    (e.prototype.cardCount = function () {
                        return this.cards.length;
                    }),
                    (e.prototype.removeCard = function (e) {
                        return _.remove(this.cards, e), this._updateCardPositions();
                    }),
                    (e.prototype.insertCard = function (e, t) {
                        return this.cards.splice(t, 0, e), this._updateCardPositions();
                    }),
                    (e.prototype.shiftCard = function (e, t) {
                        return _.remove(this.cards, e), this.insertCard(e, t);
                    }),
                    (e.prototype.cardIds = function () {
                        return _.map(this.cards, function (e) {
                            return e.id;
                        });
                    }),
                    (e.prototype.cardListIsFull = function () {
                        return !!this.cardLimit && this.cardCount() >= this.cardLimit;
                    }),
                    (e.prototype._updateCardPositions = function () {
                        return _.each(this.cards, function (e, t) {
                            if (e.position) return (e.position = t + 1);
                        });
                    }),
                    e
                );
            })()),
            (n = (function () {
                function e(e) {
                    (this.label = OptimalSort.CardSortStateManager.unsortedCategoryLabel), (this.cards = e.cards), this._updateCardPositions();
                }
                return i(e, t), e;
            })());
    }).call(this),
    (function () {
        OptimalSort.CardSortUpdater = (function () {
            function e(e, t) {
                (this.stateManager = e), (this.updateURL = t), (this.updating = !1), (this.updateQueued = !1), (this.previousData = {});
            }
            return (
                (e.prototype.requestUpdate = function () {
                    var e;
                    if (this.updating) this.updateQueued = !0;
                    else {
                        if (((e = this.stateManager.cardSortJson()), this.previousData !== e)) return (this.updating = !0), (this.updateQueued = !1), this.update();
                        this.updateQueued = !1;
                    }
                }),
                (e.prototype.update = function (e) {
                    var t, n, i;
                    return (
                        null == e && (e = {}),
                        (n = $.Deferred()),
                        (t = this.stateManager.cardSortJson()),
                        $.ajax({ type: "PUT", url: this.updateURL, data: $.extend({}, { card_sort_json: t }, e) })
                            .always(
                                ((i = this),
                                function () {
                                    return (i.updating = !1);
                                })
                            )
                            .done(
                                (function (e) {
                                    return function () {
                                        return (e.previousData = t), e.updateQueued && e.requestUpdate(), n.resolve();
                                    };
                                })(this)
                            )
                            .fail(
                                (function (e) {
                                    return function (i) {
                                        return "undefined" != typeof _StatHat && null !== _StatHat && _StatHat.push(["_trackCount", "E2Di2JZpycimmBT1FajIuiBJYUgw", 1]), n.reject(e._errorMessage(i), e._failedToSubmitCardSortJson(t));
                                    };
                                })(this)
                            ),
                        n
                    );
                }),
                (e.prototype._errorMessage = function (e) {
                    return 0 === e.readyState || 0 === e.status ? "Server was unreachable" : "Couldn't reach the server: " + e.status;
                }),
                (e.prototype._failedToSubmitCardSortJson = function (e) {
                    return { card_sort_json: JSON.parse(e), url: this.updateURL };
                }),
                e
            );
        })();
    }).call(this); 

})( jQuery );