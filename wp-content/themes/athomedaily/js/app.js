/**
 * Retrieve custom tracking parameters from the query string and pass them through
 * to AdButler as custom click parameters.
 * Usage: AdButler.ads.push({handler: function(opt){ AdButler.register(opt: { ...getCustomABParams() }});
 * https://www.adbutler.com/help/article/custom-click-parameters
 */
const getCustomABParams = () => {
  if (!URLSearchParams) {
    return {}
  }

  const searchParams = new URLSearchParams(document.location.search)
  const sc = searchParams.get('sc')
  const tc = searchParams.get('tc')
  const customParams = [
    sc && `SC: ${sc}`,
    tc && `TC: ${tc}`
  ].filter(p => p)

  return { customParams }
}

const showConfirmation = () => {
  const searchParams = new URLSearchParams(document.location.search)

  const utmSource = searchParams.get('utm_source')
  const utmMedium = searchParams.get('utm_medium')
  const utmCampaign = searchParams.get('utm_campaign')
  const confirmationVariation = searchParams.get('confirmation_variation') || 1

  const shouldShowConfirmation =
    utmSource === 'live'
    && utmMedium === 'traffic'
    && utmCampaign === 'one'

  if (shouldShowConfirmation) {
    document.querySelector(`.c-confirmation-banner--${confirmationVariation}`).classList.remove('hide')
  }
}

const ready = () => {
  const confirmationEls = document.querySelectorAll('.js-confirmation, .js-confirmation-blur')
  const confirmationTriggers = document.querySelectorAll('.js-confirmation-trigger')
  showConfirmation()

  const closeConfirmation = () => {
    [...confirmationEls].forEach(el => el.classList.add('hide'))
  }

  [...confirmationTriggers].forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault()
      closeConfirmation()
    })
  })
}

if (document.readyState !== 'loading') {
  ready()
} else {
  document.addEventListener('DOMContentLoaded', ready)
}
