/* Spotify JS-SDK - v1.8.0-9e27ad5 */
;(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require
          if (!f && c) return c(i, !0)
          if (u) return u(i, !0)
          var a = new Error("Cannot find module '" + i + "'")
          throw ((a.code = 'MODULE_NOT_FOUND'), a)
        }
        var p = (n[i] = { exports: {} })
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r]
            return o(n || r)
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        )
      }
      return n[i].exports
    }
    for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++) o(t[i])
    return o
  }
  return r
})()(
  {
    1: [
      function (require, module, exports) {
        ;(function (global) {
          ;(function () {
            var __extends,
              __assign,
              __rest,
              __decorate,
              __param,
              __metadata,
              __awaiter,
              __generator,
              __exportStar,
              __values,
              __read,
              __spread,
              __spreadArrays,
              __await,
              __asyncGenerator,
              __asyncDelegator,
              __asyncValues,
              __makeTemplateObject,
              __importStar,
              __importDefault,
              __classPrivateFieldGet,
              __classPrivateFieldSet,
              __createBinding
            !(function (e) {
              var t = 'object' == typeof global ? global : 'object' == typeof self ? self : 'object' == typeof this ? this : {}
              function r(e, r) {
                return (
                  e !== t && ('function' == typeof Object.create ? Object.defineProperty(e, '__esModule', { value: !0 }) : (e.__esModule = !0)),
                  function (t, n) {
                    return (e[t] = r ? r(t, n) : n)
                  }
                )
              }
              'function' == typeof define && define.amd
                ? define('tslib', ['exports'], function (n) {
                    e(r(t, r(n)))
                  })
                : 'object' == typeof module && 'object' == typeof module.exports
                ? e(r(t, r(module.exports)))
                : e(r(t))
            })(function (e) {
              var t =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, t) {
                    e.__proto__ = t
                  }) ||
                function (e, t) {
                  for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
                }
              ;(__extends = function (e, r) {
                function n() {
                  this.constructor = e
                }
                t(e, r), (e.prototype = null === r ? Object.create(r) : ((n.prototype = r.prototype), new n()))
              }),
                (__assign =
                  Object.assign ||
                  function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    return e
                  }),
                (__rest = function (e, t) {
                  var r = {}
                  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n])
                  if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
                    var o = 0
                    for (n = Object.getOwnPropertySymbols(e); o < n.length; o++) t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]])
                  }
                  return r
                }),
                (__decorate = function (e, t, r, n) {
                  var o,
                    a = arguments.length,
                    _ = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, r)) : n
                  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) _ = Reflect.decorate(e, t, r, n)
                  else for (var i = e.length - 1; i >= 0; i--) (o = e[i]) && (_ = (a < 3 ? o(_) : a > 3 ? o(t, r, _) : o(t, r)) || _)
                  return a > 3 && _ && Object.defineProperty(t, r, _), _
                }),
                (__param = function (e, t) {
                  return function (r, n) {
                    t(r, n, e)
                  }
                }),
                (__metadata = function (e, t) {
                  if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata) return Reflect.metadata(e, t)
                }),
                (__awaiter = function (e, t, r, n) {
                  return new (r || (r = Promise))(function (o, a) {
                    function _(e) {
                      try {
                        c(n.next(e))
                      } catch (e) {
                        a(e)
                      }
                    }
                    function i(e) {
                      try {
                        c(n.throw(e))
                      } catch (e) {
                        a(e)
                      }
                    }
                    function c(e) {
                      var t
                      e.done
                        ? o(e.value)
                        : ((t = e.value),
                          t instanceof r
                            ? t
                            : new r(function (e) {
                                e(t)
                              })).then(_, i)
                    }
                    c((n = n.apply(e, t || [])).next())
                  })
                }),
                (__generator = function (e, t) {
                  var r,
                    n,
                    o,
                    a,
                    _ = {
                      label: 0,
                      sent: function () {
                        if (1 & o[0]) throw o[1]
                        return o[1]
                      },
                      trys: [],
                      ops: [],
                    }
                  return (
                    (a = { next: i(0), throw: i(1), return: i(2) }),
                    'function' == typeof Symbol &&
                      (a[Symbol.iterator] = function () {
                        return this
                      }),
                    a
                  )
                  function i(a) {
                    return function (i) {
                      return (function (a) {
                        if (r) throw new TypeError('Generator is already executing.')
                        for (; _; )
                          try {
                            if (((r = 1), n && (o = 2 & a[0] ? n.return : a[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, a[1])).done)) return o
                            switch (((n = 0), o && (a = [2 & a[0], o.value]), a[0])) {
                              case 0:
                              case 1:
                                o = a
                                break
                              case 4:
                                return _.label++, { value: a[1], done: !1 }
                              case 5:
                                _.label++, (n = a[1]), (a = [0])
                                continue
                              case 7:
                                ;(a = _.ops.pop()), _.trys.pop()
                                continue
                              default:
                                if (!(o = (o = _.trys).length > 0 && o[o.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                  _ = 0
                                  continue
                                }
                                if (3 === a[0] && (!o || (a[1] > o[0] && a[1] < o[3]))) {
                                  _.label = a[1]
                                  break
                                }
                                if (6 === a[0] && _.label < o[1]) {
                                  ;(_.label = o[1]), (o = a)
                                  break
                                }
                                if (o && _.label < o[2]) {
                                  ;(_.label = o[2]), _.ops.push(a)
                                  break
                                }
                                o[2] && _.ops.pop(), _.trys.pop()
                                continue
                            }
                            a = t.call(e, _)
                          } catch (e) {
                            ;(a = [6, e]), (n = 0)
                          } finally {
                            r = o = 0
                          }
                        if (5 & a[0]) throw a[1]
                        return { value: a[0] ? a[1] : void 0, done: !0 }
                      })([a, i])
                    }
                  }
                }),
                (__createBinding = function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r])
                }),
                (__exportStar = function (e, t) {
                  for (var r in e) 'default' === r || t.hasOwnProperty(r) || (t[r] = e[r])
                }),
                (__values = function (e) {
                  var t = 'function' == typeof Symbol && Symbol.iterator,
                    r = t && e[t],
                    n = 0
                  if (r) return r.call(e)
                  if (e && 'number' == typeof e.length)
                    return {
                      next: function () {
                        return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e }
                      },
                    }
                  throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.')
                }),
                (__read = function (e, t) {
                  var r = 'function' == typeof Symbol && e[Symbol.iterator]
                  if (!r) return e
                  var n,
                    o,
                    a = r.call(e),
                    _ = []
                  try {
                    for (; (void 0 === t || t-- > 0) && !(n = a.next()).done; ) _.push(n.value)
                  } catch (e) {
                    o = { error: e }
                  } finally {
                    try {
                      n && !n.done && (r = a.return) && r.call(a)
                    } finally {
                      if (o) throw o.error
                    }
                  }
                  return _
                }),
                (__spread = function () {
                  for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(__read(arguments[t]))
                  return e
                }),
                (__spreadArrays = function () {
                  for (var e = 0, t = 0, r = arguments.length; t < r; t++) e += arguments[t].length
                  var n = Array(e),
                    o = 0
                  for (t = 0; t < r; t++) for (var a = arguments[t], _ = 0, i = a.length; _ < i; _++, o++) n[o] = a[_]
                  return n
                }),
                (__await = function (e) {
                  return this instanceof __await ? ((this.v = e), this) : new __await(e)
                }),
                (__asyncGenerator = function (e, t, r) {
                  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.')
                  var n,
                    o = r.apply(e, t || []),
                    a = []
                  return (
                    (n = {}),
                    _('next'),
                    _('throw'),
                    _('return'),
                    (n[Symbol.asyncIterator] = function () {
                      return this
                    }),
                    n
                  )
                  function _(e) {
                    o[e] &&
                      (n[e] = function (t) {
                        return new Promise(function (r, n) {
                          a.push([e, t, r, n]) > 1 || i(e, t)
                        })
                      })
                  }
                  function i(e, t) {
                    try {
                      ;(r = o[e](t)).value instanceof __await ? Promise.resolve(r.value.v).then(c, u) : l(a[0][2], r)
                    } catch (e) {
                      l(a[0][3], e)
                    }
                    var r
                  }
                  function c(e) {
                    i('next', e)
                  }
                  function u(e) {
                    i('throw', e)
                  }
                  function l(e, t) {
                    e(t), a.shift(), a.length && i(a[0][0], a[0][1])
                  }
                }),
                (__asyncDelegator = function (e) {
                  var t, r
                  return (
                    (t = {}),
                    n('next'),
                    n('throw', function (e) {
                      throw e
                    }),
                    n('return'),
                    (t[Symbol.iterator] = function () {
                      return this
                    }),
                    t
                  )
                  function n(n, o) {
                    t[n] = e[n]
                      ? function (t) {
                          return (r = !r) ? { value: __await(e[n](t)), done: 'return' === n } : o ? o(t) : t
                        }
                      : o
                  }
                }),
                (__asyncValues = function (e) {
                  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.')
                  var t,
                    r = e[Symbol.asyncIterator]
                  return r
                    ? r.call(e)
                    : ((e = 'function' == typeof __values ? __values(e) : e[Symbol.iterator]()),
                      (t = {}),
                      n('next'),
                      n('throw'),
                      n('return'),
                      (t[Symbol.asyncIterator] = function () {
                        return this
                      }),
                      t)
                  function n(r) {
                    t[r] =
                      e[r] &&
                      function (t) {
                        return new Promise(function (n, o) {
                          ;(function (e, t, r, n) {
                            Promise.resolve(n).then(function (t) {
                              e({ value: t, done: r })
                            }, t)
                          })(n, o, (t = e[r](t)).done, t.value)
                        })
                      }
                  }
                }),
                (__makeTemplateObject = function (e, t) {
                  return Object.defineProperty ? Object.defineProperty(e, 'raw', { value: t }) : (e.raw = t), e
                }),
                (__importStar = function (e) {
                  if (e && e.__esModule) return e
                  var t = {}
                  if (null != e) for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r])
                  return (t.default = e), t
                }),
                (__importDefault = function (e) {
                  return e && e.__esModule ? e : { default: e }
                }),
                (__classPrivateFieldGet = function (e, t) {
                  if (!t.has(e)) throw new TypeError('attempted to get private field on non-instance')
                  return t.get(e)
                }),
                (__classPrivateFieldSet = function (e, t, r) {
                  if (!t.has(e)) throw new TypeError('attempted to set private field on non-instance')
                  return t.set(e, r), r
                }),
                e('__extends', __extends),
                e('__assign', __assign),
                e('__rest', __rest),
                e('__decorate', __decorate),
                e('__param', __param),
                e('__metadata', __metadata),
                e('__awaiter', __awaiter),
                e('__generator', __generator),
                e('__exportStar', __exportStar),
                e('__createBinding', __createBinding),
                e('__values', __values),
                e('__read', __read),
                e('__spread', __spread),
                e('__spreadArrays', __spreadArrays),
                e('__await', __await),
                e('__asyncGenerator', __asyncGenerator),
                e('__asyncDelegator', __asyncDelegator),
                e('__asyncValues', __asyncValues),
                e('__makeTemplateObject', __makeTemplateObject),
                e('__importStar', __importStar),
                e('__importDefault', __importDefault),
                e('__classPrivateFieldGet', __classPrivateFieldGet),
                e('__classPrivateFieldSet', __classPrivateFieldSet)
            })
          }.call(this))
        }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}))
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        'use strict'
        var Errors
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.Errors = void 0),
          (function (r) {
            ;(r.INVALID_LISTENER = 'INVALID_LISTENER'),
              (r.INVALID_WEBPLAYBACK = 'INVALID_WEBPLAYBACK'),
              (r.NO_BODY = 'NO_BODY'),
              (r.NO_EVENT = 'NO_EVENT'),
              (r.INVALID_OAUTH = 'INVALID_OAUTH'),
              (r.MISSING_IFRAME = 'MISSING_IFRAME')
          })((Errors = exports.Errors || (exports.Errors = {})))
      },
      {},
    ],
    3: [
      function (require, module, exports) {
        'use strict'
        var Events
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.Events = void 0),
          (function (E) {
            ;(E.SPOTIFY_MESSAGE = 'SP_MESSAGE'),
              (E.ACCOUNT_ERROR = 'ACCOUNT_ERROR'),
              (E.AUTH_ERROR = 'AUTH_ERROR'),
              (E.CONNECT = 'CONNECT'),
              (E.CONNECTED = 'CONNECTED'),
              (E.CURRENT_STATE = 'CURRENT_STATE'),
              (E.DISCONNECT = 'DISCONNECT'),
              (E.EVENT = 'EVENT'),
              (E.GET_CURRENT_STATE = 'GET_CURRENT_STATE'),
              (E.GET_TOKEN = 'GET_TOKEN'),
              (E.GET_VOLUME = 'GET_VOLUME'),
              (E.INIT = 'INIT'),
              (E.LOADED = 'LOADED'),
              (E.NEXT_TRACK = 'NEXT_TRACK'),
              (E.PAUSE = 'PAUSE'),
              (E.PLAYBACK_ERROR = 'PLAYBACK_ERROR'),
              (E.PLAYER_INIT_ERROR = 'PLAYER_INIT_ERROR'),
              (E.PLAYER_READY = 'PLAYER_READY'),
              (E.PLAYER_NOT_READY = 'PLAYER_NOT_READY'),
              (E.PLAYER_STATE_CHANGED = 'PLAYER_STATE_CHANGED'),
              (E.PREV_TRACK = 'PREV_TRACK'),
              (E.RESUME = 'RESUME'),
              (E.SEEK = 'SEEK'),
              (E.SET_NAME = 'SET_NAME'),
              (E.SET_VOLUME = 'SET_VOLUME'),
              (E.TOGGLE_PLAY = 'TOGGLE_PLAY'),
              (E.TOKEN = 'TOKEN'),
              (E.VOLUME = 'VOLUME')
          })((Events = exports.Events || (exports.Events = {})))
      },
      {},
    ],
    4: [
      function (require, module, exports) {
        'use strict'
        var HumanizedEvents
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.HumanizedEvents = void 0),
          (function (e) {
            ;(e.ACCOUNT_ERROR = 'account_error'),
              (e.AUTH_ERROR = 'authentication_error'),
              (e.PLAYBACK_ERROR = 'playback_error'),
              (e.PLAYER_INIT_ERROR = 'initialization_error'),
              (e.PLAYER_READY = 'ready'),
              (e.PLAYER_NOT_READY = 'not_ready'),
              (e.PLAYER_STATE_CHANGED = 'player_state_changed')
          })((HumanizedEvents = exports.HumanizedEvents || (exports.HumanizedEvents = {})))
      },
      {},
    ],
    5: [
      function (require, module, exports) {
        'use strict'
        var Messages
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.Messages = void 0),
          (function (E) {
            ;(E.SPOTIFY_MESSAGE = 'SP_MESSAGE'),
              (E.ACCOUNT_ERROR = 'ACCOUNT_ERROR'),
              (E.AUTH_ERROR = 'AUTH_ERROR'),
              (E.CONNECT = 'CONNECT'),
              (E.CONNECTED = 'CONNECTED'),
              (E.CURRENT_STATE = 'CURRENT_STATE'),
              (E.DISCONNECT = 'DISCONNECT'),
              (E.EVENT = 'EVENT'),
              (E.GET_CURRENT_STATE = 'GET_CURRENT_STATE'),
              (E.GET_TOKEN = 'GET_TOKEN'),
              (E.GET_VOLUME = 'GET_VOLUME'),
              (E.INIT = 'INIT'),
              (E.LOADED = 'LOADED'),
              (E.NEXT_TRACK = 'NEXT_TRACK'),
              (E.PAUSE = 'PAUSE'),
              (E.PLAYBACK_ERROR = 'PLAYBACK_ERROR'),
              (E.PLAYER_INIT_ERROR = 'PLAYER_INIT_ERROR'),
              (E.PLAYER_READY = 'PLAYER_READY'),
              (E.PLAYER_NOT_READY = 'PLAYER_NOT_READY'),
              (E.PLAYER_STATE_CHANGED = 'PLAYER_STATE_CHANGED'),
              (E.PREV_TRACK = 'PREV_TRACK'),
              (E.RESUME = 'RESUME'),
              (E.SEEK = 'SEEK'),
              (E.SET_NAME = 'SET_NAME'),
              (E.SET_VOLUME = 'SET_VOLUME'),
              (E.TOGGLE_PLAY = 'TOGGLE_PLAY'),
              (E.TOKEN = 'TOKEN'),
              (E.VOLUME = 'VOLUME')
          })((Messages = exports.Messages || (exports.Messages = {})))
      },
      {},
    ],
    6: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.PlayerError = void 0)
        var tslib_1 = require('tslib'),
          PlayerError = (function (r) {
            function e(e, t) {
              var o = r.call(this, t) || this
              return (o.code = e), (o.message = t), (o.name = 'AnthemError'), o
            }
            return tslib_1.__extends(e, r), e
          })(Error)
        exports.PlayerError = PlayerError
      },
      { tslib: 1 },
    ],
    7: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 })
        var errors_1 = require('../enums/errors'),
          player_error_1 = require('../error/player_error'),
          player_api_1 = require('./player_api')
        function initPlayerApi() {
          if (!document.body) throw new player_error_1.PlayerError(errors_1.Errors.NO_BODY, "Document doesn't have a body")
          if (((window.Spotify = { Player: player_api_1.setupPlayerEnv(window) }), window.onSpotifyWebPlaybackSDKReady)) return window.onSpotifyWebPlaybackSDKReady()
          if (window.onSpotifyPlayerAPIReady) return window.onSpotifyPlayerAPIReady()
          throw new player_error_1.PlayerError(errors_1.Errors.INVALID_WEBPLAYBACK, 'onSpotifyWebPlaybackSDKReady is not defined')
        }
        'complete' === document.readyState ? initPlayerApi() : window.addEventListener('load', initPlayerApi)
      },
      { '../enums/errors': 2, '../error/player_error': 6, './player_api': 8 },
    ],
    8: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.setupPlayerEnv = void 0)
        var tslib_1 = require('tslib'),
          messages_1 = require('../enums/messages'),
          events_1 = require('../enums/events'),
          humanizedEvents_1 = require('../enums/humanizedEvents'),
          errors_1 = require('../enums/errors'),
          player_error_1 = require('../error/player_error'),
          message_dispatcher_1 = require('../shared/message_dispatcher'),
          messages_factory_1 = require('../shared/messages_factory'),
          defer_1 = require('../shared/defer')
        exports.setupPlayerEnv = function (e, s) {
          var t = 'https://sdk.scdn.co/embedded/index.html',
            n = defer_1.defer(),
            r = message_dispatcher_1.MessageDispatcher.create(),
            o =
              s ||
              function (s) {
                var t = e.document.createElement('iframe')
                return (
                  (t.src = s),
                  t.setAttribute('alt', 'Audio Playback Container'),
                  t.setAttribute('tabIndex', '-1'),
                  t.style.setProperty('position', 'absolute', 'important'),
                  t.style.setProperty('left', '-1px', 'important'),
                  t.style.setProperty('width', '0', 'important'),
                  t.style.setProperty('height', '0', 'important'),
                  t.style.setProperty('border', 'none', 'important'),
                  t.style.setProperty('outline', 'none', 'important'),
                  (t.allow = 'encrypted-media; autoplay'),
                  e.document.body.appendChild(t),
                  t.contentWindow
                )
              }
          r.listen(e, function (s) {
            s === messages_1.Messages.LOADED && (r.stopListening(e), n.resolve())
          })
          var i = o(t)
          return (function () {
            function s(s) {
              var t,
                o,
                i,
                a,
                u = this
              ;(this._options = {
                name: s.name || (null === (i = null == e ? void 0 : e.location) || void 0 === i ? void 0 : i.hostname) || '',
                getOAuthToken: s.getOAuthToken || s.getOauthToken,
                volume: null !== (a = s.volume) && void 0 !== a ? a : 1,
              }),
                (this._handleMessages = this._handleMessages.bind(this)),
                (this._eventListeners =
                  (((t = {})[humanizedEvents_1.HumanizedEvents.ACCOUNT_ERROR] = []),
                  (t[humanizedEvents_1.HumanizedEvents.AUTH_ERROR] = []),
                  (t[humanizedEvents_1.HumanizedEvents.PLAYBACK_ERROR] = []),
                  (t[humanizedEvents_1.HumanizedEvents.PLAYER_INIT_ERROR] = []),
                  (t[humanizedEvents_1.HumanizedEvents.PLAYER_READY] = []),
                  (t[humanizedEvents_1.HumanizedEvents.PLAYER_NOT_READY] = []),
                  (t[humanizedEvents_1.HumanizedEvents.PLAYER_STATE_CHANGED] = []),
                  t)),
                (this._connectionRequests = {}),
                (this._getCurrentStateRequests = {}),
                (this._getVolumeRequests = {}),
                (this._messageHandlers =
                  (((o = {})[messages_1.Messages.GET_TOKEN] = this._onGetToken.bind(this)),
                  (o[messages_1.Messages.EVENT] = this._onEvent.bind(this)),
                  (o[messages_1.Messages.CONNECTED] = this._onConnected.bind(this)),
                  (o[messages_1.Messages.CURRENT_STATE] = this._onCurrentState.bind(this)),
                  (o[messages_1.Messages.VOLUME] = this._onVolume.bind(this)),
                  o)),
                (this.isLoaded = n.promise.then(function () {
                  r.listen(e, u._handleMessages), u._sendMessage(messages_factory_1.messages.init(u._options))
                }))
            }
            return (
              (s.prototype._getListeners = function (e) {
                return tslib_1.__spreadArrays(this._eventListeners[e])
              }),
              (s.prototype._onEvent = function (e) {
                this._getListeners(humanizedEvents_1.HumanizedEvents[e.name]).forEach(function (s) {
                  s(e.eventData)
                })
              }),
              (s.prototype._onGetToken = function (e, s) {
                var t = this,
                  n = this._options.getOAuthToken
                if ('function' == typeof n)
                  new Promise(n).then(function (e) {
                    t._sendMessage(messages_factory_1.messages.token(e, s))
                  })
                else {
                  if (!this._getListeners(humanizedEvents_1.HumanizedEvents.PLAYER_INIT_ERROR).length)
                    throw new player_error_1.PlayerError(errors_1.Errors.INVALID_OAUTH, 'getOAuthToken is not a function')
                  this._onEvent({ name: events_1.Events.PLAYER_INIT_ERROR, eventData: { message: errors_1.Errors.INVALID_OAUTH } })
                }
              }),
              (s.prototype._onConnected = function (e) {
                e.ref in this._connectionRequests && (this._connectionRequests[e.ref].resolve(e.connected), delete this._connectionRequests[e.ref])
              }),
              (s.prototype._onCurrentState = function (e) {
                e.ref in this._getCurrentStateRequests && (this._getCurrentStateRequests[e.ref].resolve(e.state), delete this._getCurrentStateRequests[e.ref])
              }),
              (s.prototype._onVolume = function (e) {
                e.ref in this._getVolumeRequests && (this._getVolumeRequests[e.ref].resolve(e.volume), delete this._getVolumeRequests[e.ref])
              }),
              (s.prototype._handleMessages = function (e, s, t) {
                var n, r
                null === (r = (n = this._messageHandlers)[e]) || void 0 === r || r.call(n, s, t)
              }),
              (s.prototype._sendMessage = function (e) {
                return r.send(i, e, t)
              }),
              (s.prototype._sendMessageWhenLoaded = function (e) {
                var s = this
                return this.isLoaded.then(function () {
                  return s._sendMessage(e)
                })
              }),
              (s.prototype.connect = function () {
                var e = this
                return this.isLoaded.then(function () {
                  var s = e._sendMessage(messages_factory_1.messages.connect())
                  return (e._connectionRequests[s] = defer_1.defer()), e._connectionRequests[s].promise
                })
              }),
              (s.prototype.on = function (e, s) {
                return -1 === this._eventListeners[e].indexOf(s) && (this._eventListeners[e].push(s), !0)
              }),
              (s.prototype.addListener = function (e, s) {
                return this.on(e, s)
              }),
              (s.prototype.removeListener = function (e, s) {
                var t = this._eventListeners[e]
                return 1 === arguments.length
                  ? ((this._eventListeners[e] = []), !0)
                  : !(!t || !t.length) &&
                      ((this._eventListeners[e] = t.filter(function (e) {
                        return e !== s
                      })),
                      !0)
              }),
              (s.prototype.getCurrentState = function () {
                var e = this
                return this.isLoaded.then(function () {
                  var s = e._sendMessage(messages_factory_1.messages.getCurrentState())
                  return (e._getCurrentStateRequests[s] = defer_1.defer()), e._getCurrentStateRequests[s].promise
                })
              }),
              (s.prototype.getVolume = function () {
                var e = this
                return this.isLoaded.then(function () {
                  var s = e._sendMessage(messages_factory_1.messages.getVolume())
                  return (e._getVolumeRequests[s] = defer_1.defer()), e._getVolumeRequests[s].promise
                })
              }),
              (s.prototype.setName = function (e) {
                return this._sendMessageWhenLoaded(messages_factory_1.messages.setName(e))
              }),
              (s.prototype.setVolume = function (e) {
                return this._sendMessageWhenLoaded(messages_factory_1.messages.setVolume(e))
              }),
              (s.prototype.pause = function () {
                return this._sendMessageWhenLoaded(messages_factory_1.messages.pause())
              }),
              (s.prototype.resume = function () {
                return this._sendMessageWhenLoaded(messages_factory_1.messages.resume())
              }),
              (s.prototype.togglePlay = function () {
                return this._sendMessageWhenLoaded(messages_factory_1.messages.togglePlay())
              }),
              (s.prototype.seek = function (e) {
                return this._sendMessageWhenLoaded(messages_factory_1.messages.seek(e))
              }),
              (s.prototype.previousTrack = function (e) {
                return this._sendMessageWhenLoaded(messages_factory_1.messages.previousTrack(e))
              }),
              (s.prototype.nextTrack = function (e) {
                return this._sendMessageWhenLoaded(messages_factory_1.messages.nextTrack(e))
              }),
              (s.prototype.disconnect = function () {
                return this._sendMessageWhenLoaded(messages_factory_1.messages.disconnect())
              }),
              s
            )
          })()
        }
      },
      {
        '../enums/errors': 2,
        '../enums/events': 3,
        '../enums/humanizedEvents': 4,
        '../enums/messages': 5,
        '../error/player_error': 6,
        '../shared/defer': 9,
        '../shared/message_dispatcher': 10,
        '../shared/messages_factory': 11,
        tslib: 1,
      },
    ],
    9: [
      function (require, module, exports) {
        'use strict'
        function defer() {
          var e, r
          return {
            promise: new Promise(function (o, t) {
              ;(e = o), (r = t)
            }),
            resolve: e,
            reject: r,
          }
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.defer = void 0), (exports.defer = defer)
      },
      {},
    ],
    10: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.MessageDispatcher = void 0)
        var messages_1 = require('../enums/messages'),
          MessageDispatcher = (function () {
            function e() {
              ;(this._seq = 0), (this._onMessageCallback = function () {}), (this._receiveMessage = this._receiveMessage.bind(this))
            }
            return (
              (e.create = function () {
                return new e()
              }),
              (e.prototype._addMessageId = function (e) {
                return (e.seq = this._seq++), e
              }),
              (e.prototype._receiveMessage = function (e) {
                if (e.data) {
                  var s = e.data,
                    t = s.type,
                    a = s.body,
                    i = s.seq
                  t === messages_1.Messages.SPOTIFY_MESSAGE && (null == a ? void 0 : a.topic) && this._onMessageCallback(a.topic, a.data, i)
                }
              }),
              (e.prototype.listen = function (e, s) {
                ;(this._onMessageCallback = s), e.addEventListener('message', this._receiveMessage)
              }),
              (e.prototype.stopListening = function (e) {
                e.removeEventListener('message', this._receiveMessage)
              }),
              (e.prototype.send = function (e, s, t) {
                void 0 === t && (t = '*')
                var a = this._addMessageId(s)
                return e.postMessage(a, t), a.seq
              }),
              e
            )
          })()
        exports.MessageDispatcher = MessageDispatcher
      },
      { '../enums/messages': 5 },
    ],
    11: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.messages = void 0)
        var messages_1 = require('../enums/messages'),
          MessagesFactory = (function () {
            function e() {}
            return (
              (e.create = function () {
                return new e()
              }),
              (e.prototype._createEventMessage = function (e, s) {
                return this._createMessage(messages_1.Messages.EVENT, { name: e, eventData: s })
              }),
              (e.prototype._createMessage = function (e, s) {
                return { type: messages_1.Messages.SPOTIFY_MESSAGE, body: { topic: e, data: s ? JSON.parse(JSON.stringify(s)) : void 0 } }
              }),
              (e.prototype.accountError = function (e) {
                return this._createEventMessage(messages_1.Messages.ACCOUNT_ERROR, { message: e })
              }),
              (e.prototype.authError = function (e) {
                return this._createEventMessage(messages_1.Messages.AUTH_ERROR, e)
              }),
              (e.prototype.playbackError = function (e) {
                return this._createEventMessage(messages_1.Messages.PLAYBACK_ERROR, e)
              }),
              (e.prototype.playerReady = function (e) {
                return this._createEventMessage(messages_1.Messages.PLAYER_READY, e)
              }),
              (e.prototype.playerNotReady = function (e) {
                return this._createEventMessage(messages_1.Messages.PLAYER_NOT_READY, e)
              }),
              (e.prototype.connect = function () {
                return this._createMessage(messages_1.Messages.CONNECT)
              }),
              (e.prototype.connected = function (e, s) {
                return this._createMessage(messages_1.Messages.CONNECTED, { connected: e, ref: s })
              }),
              (e.prototype.disconnect = function () {
                return this._createMessage(messages_1.Messages.DISCONNECT)
              }),
              (e.prototype.init = function (e) {
                return this._createMessage(messages_1.Messages.INIT, e)
              }),
              (e.prototype.playerInitError = function (e) {
                return this._createEventMessage(messages_1.Messages.PLAYER_INIT_ERROR, e)
              }),
              (e.prototype.getToken = function () {
                return this._createMessage(messages_1.Messages.GET_TOKEN)
              }),
              (e.prototype.token = function (e, s) {
                return this._createMessage(messages_1.Messages.TOKEN, { token: e, ref: s })
              }),
              (e.prototype.pause = function () {
                return this._createMessage(messages_1.Messages.PAUSE)
              }),
              (e.prototype.resume = function () {
                return this._createMessage(messages_1.Messages.RESUME)
              }),
              (e.prototype.togglePlay = function () {
                return this._createMessage(messages_1.Messages.TOGGLE_PLAY)
              }),
              (e.prototype.seek = function (e) {
                return this._createMessage(messages_1.Messages.SEEK, e)
              }),
              (e.prototype.nextTrack = function (e) {
                return this._createMessage(messages_1.Messages.NEXT_TRACK, e)
              }),
              (e.prototype.previousTrack = function (e) {
                return this._createMessage(messages_1.Messages.PREV_TRACK, e)
              }),
              (e.prototype.getCurrentState = function () {
                return this._createMessage(messages_1.Messages.GET_CURRENT_STATE)
              }),
              (e.prototype.currentState = function (e, s) {
                return this._createMessage(messages_1.Messages.CURRENT_STATE, { state: e, ref: s })
              }),
              (e.prototype.playerStateChanged = function (e) {
                return this._createEventMessage(messages_1.Messages.PLAYER_STATE_CHANGED, e)
              }),
              (e.prototype.getVolume = function () {
                return this._createMessage(messages_1.Messages.GET_VOLUME)
              }),
              (e.prototype.volume = function (e, s) {
                return this._createMessage(messages_1.Messages.VOLUME, { volume: e, ref: s })
              }),
              (e.prototype.setVolume = function (e) {
                return this._createMessage(messages_1.Messages.SET_VOLUME, e)
              }),
              (e.prototype.setName = function (e) {
                return this._createMessage(messages_1.Messages.SET_NAME, e)
              }),
              (e.prototype.embeddedLoaded = function () {
                return this._createMessage(messages_1.Messages.LOADED)
              }),
              e
            )
          })()
        exports.messages = MessagesFactory.create()
      },
      { '../enums/messages': 5 },
    ],
  },
  {},
  [7]
)
