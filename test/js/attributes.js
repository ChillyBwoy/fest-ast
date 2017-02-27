module.exports = function(f$0019b14e) {
    // --- fest prolog ---
    var v$0019b14e$templates = {};
    // --- end of fest prolog ---

    return function(json) {
        return f$0019b14e('#root', {}, [
          f$0019b14e('div', {}, [
            f$0019b14e('fest:attributes', {}, [
                f$0019b14e('#attribute', {
                    "name": "data-one",
                    "value": "'foo'"
                }, []),
                f$0019b14e('#attribute', {
                    "name": "data-two",
                    "value": "'bar'"
                }, []),
                f$0019b14e('#attribute', {
                    "name": "data-three",
                    "value": "'baz'"
                }, []),
                f$0019b14e('#attribute', {
                    "name": "data-four",
                    "value": "foobaz"
                }, [])
            ])
        ]), f$0019b14e('div', {}, [
          f$0019b14e(
            'fest:attributes', {}, [(function() {
                var v$0019b14e$1 = [];
                if (true) {
                    v$0019b14e$1.push(
                        f$0019b14e(
                            '#attribute', {
                                "name": "when",
                                "value": "'true'"
                            }, []));
                } else {
                    v$0019b14e$1.push(
                        f$0019b14e(
                            '#attribute', {
                                "name": "when",
                                "value": "'false'"
                            }, []));
                }
                return v$0019b14e$1;
            }()), (function() {
                var v$0019b14e$2 = [];
                if (false) {
                    v$0019b14e$2.push(
                        f$0019b14e(
                            '#attribute', {
                                "name": "otherwise",
                                "value": "'false'"
                            }, []));
                } else {
                    v$0019b14e$2.push(
                        f$0019b14e(
                            '#attribute', {
                                "name": "otherwise",
                                "value": "'true'"
                            }, []));
                }
                return v$0019b14e$2;
            }()), f$0019b14e('#attribute', {
                "name": "&quot;",
                "value": "'&quot;'"
            }, [])])])]);
    };;
};
