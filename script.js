// ==UserScript==
// @name         Ascension Planner Utils - Genshin Center
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Calculate and display total resin and days
// @author       Clement-Cauet
// @match        https://genshin-center.com/planner
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let summaryElement = null;

    // Extract numeric value from text
    function extractNumber(text) {
        const match = text.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
    }

    // Calculate totals from all item panels
    function calculateTotals() {
        const itemPanels = document.querySelectorAll('.ItemPanel_itemWrapper__BUn4_');
        let totalResin = 0;
        let totalDays = 0;

        itemPanels.forEach(panel => {
            const miscElement = panel.querySelector('.ItemPanel_misc__PTfMs');
            if (miscElement && miscElement.children.length > 0) {
                const resinLeft = panel.querySelector('.ItemPanel_resinLeft__vjB_w p');
                const resinRight = panel.querySelector('.ItemPanel_resinRight__G_NqG p');

                if (resinLeft) totalResin += extractNumber(resinLeft.textContent);
                if (resinRight) totalDays += extractNumber(resinRight.textContent);
            }
        });

        return { totalResin, totalDays };
    }

    // Create and insert summary element
    function createSummaryElement(totalResin, totalDays) {
        const summaryHTML = `
            <div class="Schedule_scheduleWrapper__my8Xo">
                <div class="Schedule_schedule__NLwnX">
                    <div class="Schedule_taskTopBar__lV1W8">
                        <h3>Remaining</h3>
                    </div>
                    <div class="Schedule_content__uM_O7 ItemPanel_misc__PTfMs">
                        <div class="ItemPanel_resin__Z03dA">
                            <div class="ItemPanel_resinLeft__vjB_w">
                                <p>~${totalResin}</p>
                                <div class="ItemPanel_resinImg__NM_Dh"></div>
                            </div>
                            <div class="ItemPanel_resinRight__G_NqG">
                                <p>~${totalDays.toFixed(1)} Days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = summaryHTML;
        return tempDiv.firstElementChild;
    }

    // Update or create summary display
    function updateSummary() {
        const { totalResin, totalDays } = calculateTotals();
        const sidebar = document.querySelector('.Farm_sideBar__yXGVR.Farm_stickyBar__85QIF');

        if (!sidebar) return;

        // Remove existing summary if present
        if (summaryElement) {
            summaryElement.remove();
        }

        // Create new summary element
        summaryElement = createSummaryElement(totalResin, totalDays);

        // Insert as second element in sidebar
        const firstChild = sidebar.firstElementChild;
        if (firstChild && firstChild.nextElementSibling) {
            sidebar.insertBefore(summaryElement, firstChild.nextElementSibling);
        } else {
            sidebar.appendChild(summaryElement);
        }
    }

    // Remove desktop MPU wrapper
    function removeDesktopMpu() {
        const mpuWrapper = document.querySelector('.units_desktopMpuWrapper__XBoVa');
        if (mpuWrapper && mpuWrapper.parentElement) {
            mpuWrapper.parentElement.remove();
        }
    }

    // Initialize script
    function init() {
        removeDesktopMpu();
        updateSummary();

        // Recalculate on page click
        document.addEventListener('click', () => {
            setTimeout(updateSummary, 100);
        });
    }

    // Wait for ad load event or fallback timeout
    function waitForAdLoad() {
        // Listen for network requests to detect ad loading
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            const url = args[0];
            if (typeof url === 'string' && url.includes('kumo.network-n.com/dist/app.js')) {
                setTimeout(init, 500); // Execute 500ms after ad script loads
            }
            return originalFetch.apply(this, args);
        };

        // Override XMLHttpRequest as backup
        const originalXHR = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url) {
            if (url && url.includes('kumo.network-n.com/dist/app.js')) {
                this.addEventListener('load', () => {
                    setTimeout(init, 500);
                });
            }
            return originalXHR.apply(this, arguments);
        };

        // Fallback timeout in case ad doesn't load
        setTimeout(() => {
            if (!summaryElement) {
                init();
            }
        }, 3000);
    }

    // Start monitoring for ad load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForAdLoad);
    } else {
        waitForAdLoad();
    }

})();