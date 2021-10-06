import { ComponentChildren } from 'preact'
import { Link, LinkProps } from 'react-router-dom'
import { useTabs } from '../../providers/tab-provider'

export const TitledLink = (
  props: LinkProps & { title: string; icon?: ComponentChildren },
) => {
  const [, dispatch] = useTabs()

  const openTab = () =>
    dispatch({
      type: 'linkClick',
      props: { title: props.title, icon: props.icon, url: props.to.toString() },
    })

  return <Link {...props} onClick={openTab} />
}
