import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Link from 'next/link';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
// const HomepageHeading = ({ mobile }) => (
//   <></>
// )

// HomepageHeading.propTypes = {
//   mobile: PropTypes.bool,
// }

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 50, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Link href='/'>
                  <Menu.Item as='a'>
                    Home
                  </Menu.Item>
                </Link>
                <Link href='/contact'>
                  <Menu.Item as='a'>Contact</Menu.Item>
                </Link>
                <Link href='/about'>
                  <Menu.Item as='a'>About</Menu.Item>
                </Link>
                <Link href='/fraudhooks'>
                  <Menu.Item as='a'>FraudHooks</Menu.Item>
                </Link>
                <Link href='/hubmetrix'>
                  <Menu.Item as='a'>Hubmetrix</Menu.Item>
                </Link>
              </Container>
            </Menu>
            {/* <HomepageHeading /> */}
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Link href='/'>
              <Menu.Item as='a'>
                Home
              </Menu.Item>
            </Link>
            <Link href='/contact'>
              <Menu.Item as='a'>Contact</Menu.Item>
            </Link>
            <Link href='/about'>
              <Menu.Item as='a'>About</Menu.Item>
            </Link>
            <Link href='/fraudhooks'>
              <Menu.Item as='a'>FraudHooks</Menu.Item>
            </Link>
            <Link href='/hubmetrix'>
              <Menu.Item as='a'>Hubmetrix</Menu.Item>
            </Link>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 50, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                </Menu>
              </Container>
              {/* <HomepageHeading mobile /> */}
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
          FraudHooks Privacy Policy
        </Header>
        <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
        <p>FraudHooks "the App” provides auto cancelling, restocking and refunding of fraudulent Shopify orders "the Service" to merchants who use Shopify to power their stores.  
            This FraudHooks Privacy Policy describes how personal information is collected, used, and shared when you install or use the App in connection with your Shopify-supported store.</p>
        <p>Personal Information the App Collects</p>
        <p>When you install the App, we are automatically able to access certain types of information from your Shopify account:
        Customers, Fulfillments, Orders</p>
        <p>
        Additionally, we collect the following types of personal information from you and/or your customers once you have installed the App:
        Information about you and others who may access the App on behalf of your store, such as your name, address, email address, phone number, and billing information;
        We are not currently storing any information about individuals who visit your store, such as their IP address, web browser details, time zone, and information about the cookies installed on the particular device.
        We only collect a minimal amount of information related to FraudHooks settings such as:
        shopOrigin
        token
        appActive
        notifyOwner
        ownerEmail
        notifyCustomer
        actionOnFraud
        fraudScore
        riskLevel
        lastHookId
        lastHookTime
        lastHookOrderId
        lastHookRegion
        </p>
        <p>We collect personal information directly from the relevant individual, through your Shopify account, or using the following technologies:
        “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org">http://www.allaboutcookies.org</a>.
        “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
        “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.
        </p>
        <p>How Do We Use Your Personal Information?</p>
        <p>We use the personal information we collect from you and your customers in order to provide the Service and to operate the App.  [[ADD IF RELEVANT]]Additionally, we use this personal information to:
        Communicate with you;
        Optimize or improve the App; and
        Provide you with information or advertising relating to our products or services.
        </p>
        <p>Sharing Your Personal Information</p>
        <p></p>
        <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>
        <p>
        Behavioural Advertising
        As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.  For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work">http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work</a>.</p>
        <p>You can opt out of targeted advertising by:  
        Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at:  <a href="http://optout.aboutads.info/">http://optout.aboutads.info/</a>.</p>
        <p>
        Your Rights
        If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>
        <p>Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above.  Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.</p>
        <p></p>
        <p>Data Retention
        When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>
        Currently we are not storing any records related to orders, customers or fulfillments. We only process this information and then drop after processing.
        <p>Changes
        We may update this FraudHooks Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
        <p>Contact Us
        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at support@composedcloud.com or by mail using the details provided below:</p>
        <p>121 S. Tejon Street, Suite 900 
          Colorado Springs, CO  80903</p>
        </p>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Contact Us</List.Item>
                <Link href='/fraudhooks-privacy-policy'>
                  <List.Item as='a'>FraudHooks Privacy Policy</List.Item>
                </Link>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Apps' />
              <List link inverted>
                <Link href='/fraudhooks#FAQs'>
                  <List.Item as='a'>FraudHooks FAQ</List.Item>
                </Link>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout
