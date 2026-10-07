YSO_LINKS_PLUGIN = {
  highlightYSOLinks: function () {
    const hierarchy = document.querySelector('#tab-hierarchy')
    if (!hierarchy) {
      return
    }

    const applyHighlights = () => {
      // Only apply yso-concept class to elements that come from YSO
      hierarchy.querySelectorAll('a[href*="www.yso.fi%2Fonto%2Fyso%2F"], a[href*="www.yso.fi/onto/yso/"]').forEach(a => {
        a.classList.add('yso-concept')
      })
    }

    // Observe mutations in the hierarchy tree and reapply highlights when changes occur
    const observer = new MutationObserver(applyHighlights)
    observer.observe(hierarchy, { childList: true, subtree: true })
    applyHighlights()
  }
}

document.addEventListener('DOMContentLoaded', function() {
  window.ysoLinksCallback = function(params) {
    if (params.pageType === 'vocab-home' || params.pageType === 'concept') {
      YSO_LINKS_PLUGIN.highlightYSOLinks()
    }
  }
})