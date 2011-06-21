Tic Tac Toe Solution
====================

I've created my solution in JavaScript. Initially I considered doing a Python and JavaScript hybrid with ajax calls to a Django backend but this seemed like overkill to me. The final solution is implemented as a jQuery plugin (``code/jquery.tictac.js``).

**To view the solution, open** ``code/game.html`` **in your browser.**

How to use the plugin
*********************

Using the tictac plugin is easy. It's a basic jQuery plugin that doesn't allow for any customizations in its current form. Create an HTML page with a table marked up like so::

    
    <table id="board" class="board">
        <tr>
            <td id="one" class="even"></td>
            <td id="two"></td>
            <td id="three" class="even"></td>
        </tr>
        <tr>
            <td id="four"></td>
            <td id="five" class="even"></td>
            <td id="six"></td>
        </tr>
        <tr>
            <td id="seven" class="even"></td>
            <td id="eight"></td>
            <td id="nine" class="even"></td>
        </tr>
    </table>

Then add the following JavaScript to your HTML page before the ``</body>`` tag::

    <script src="http://code.jquery.com/jquery-1.5.1.js" type="text/javascript" charset="utf-8"></script>
    <script src="path/to/jquery.tictac.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
        $(function() {
            $("#board").tictac();
        });
    </script>

The HTML page in ``code/game.html`` has a full working example with three boards on it.

Tests
*****

Tests were built using `QUnit`_. To run them, simply open ``code/tests/qunit.html`` in your browser.

.. _QUnit: http://docs.jquery.com/Qunit
