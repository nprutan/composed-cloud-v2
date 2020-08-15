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
const HomepageHeading = ({ mobile }) => (
    <Image fluid verticalAlign='middle' src='/FraudHooks_banner_cropped.png'></Image>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

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
                  <Menu.Item as='a' active>FraudHooks</Menu.Item>
                </Link>
                <Link href='/hubmetrix'>
                  <Menu.Item as='a'>Hubmetrix</Menu.Item>
                </Link>
              </Container>
            </Menu>
            <HomepageHeading />
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
            <Menu.Item as='a'>
                  Home
              </Menu.Item>
              <Menu.Item as='a'>Contact</Menu.Item>
              <Menu.Item as='a'>About</Menu.Item>
              <Menu.Item as='a' active>FraudHooks</Menu.Item>
              <Menu.Item as='a'>Hubmetrix</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  {/* <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item> */}
                </Menu>
              </Container>
              <HomepageHeading mobile />
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
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
                <Icon name='cloudscale' size='large' /> Take Advantage Of Cloud Scale
            </Header>
            <p style={{ fontSize: '1.33em' }}>
                FraudHooks uses a feature of Shopify called webhooks. 
                These are small packets of data that get sent in response to resources like orders being created and updated. 
                FraudHooks intercepts these "hooks" in the Amazon cloud and processes them in near-realtime. 
                FraudHooks is also using a brand new integration feature called AWS EventBridge. 
                What this means is that you get to enjoy the scale of Amazon provided by these features. 
                This allows FraudHooks to very easily process unlimited orders for a low monthly price.*
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={8}>
            <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
              <Icon name='thumbs down outline' size='large' /> Worry About Business, Not Fraud
            </Header>
            <p style={{ fontSize: '1.33em' }}>
                Shopify already uses a machine learning algorithm to determine what orders are fraudulent. 
                You'll be notified of these orders in the admin and the order details page, 
                but will still need to sift through these orders and cancel them yourself. 
                FraudHooks allows you to cancel these orders automatically based on whether they are either 
                High or Medium risk. You can choose the level and whether you want to be notified as well as the customer.
            </p>
            {/* <Image bordered rounded size='large' src='/images/wireframe/white-image.png' /> */}
          </Grid.Column>
        </Grid.Row>
        <Divider hidden />
        <Grid.Row>
        <Grid.Column floated='left' width={8}>
          <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
          <Icon name='user secret' size='large' />Simulate Fraud
            </Header>
            <p style={{ fontSize: '1.33em' }}>
                FraudHooks also lets you simulate a fraudulent order by choosing the action within an order details page. 
                This is helpful if you'd like to just see how the app is working, 
                or if you'd like to simulate fraud to determine if other apps are working as well. 
                FraudHooks will work in conjunction with other apps, even if they cancel orders as well. 
                You can set FraudHooks to "warn" in the settings and allow another app to do the cancelling. 
                This way, you might use FraudHooks to help verify your store setup with other apps and logic. 
                Either way, FraudHooks will do it all for you, including the actual cancelling of fraudulent orders.
            </p>
            {/* <Image bordered rounded size='large' src='/images/wireframe/white-image.png' /> */}
          </Grid.Column>
          <Grid.Column floated='right' width={8}>
          <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
          <Icon name='cogs' size='large' />Get Insight Into The Process
            </Header>
            <p style={{ fontSize: '1.33em' }}>
                FraudHooks will show you what "hooks" have been processed in the cloud last. 
                This is helpful to ensure that the app is truly working. 
                It can be frustrating to install an app and have to hope that it's doing what it's 
                supposed to be doing. With this small but powerful bit of information, you can verify 
                that the latest webhook has gone through FraudHooks processing in the cloud. 
                This status shows even for orders that are not fraudulent, as they pass through the 
                cloud verification process.
            </p>
            {/* <Image bordered rounded size='large' src='/images/wireframe/white-image.png' /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
          <Icon name='aws' size='question circle'/>FAQs
        </Header>
        <p id='FAQs' style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
        <List as='ol'>
            <List.Item as='li' value='*'>
                Is there a free plan for Shopify development stores?
                <List.Item as='ol'>
                    <List.Item as='li' value='-'>
                        Yes
                    </List.Item>
                    <List.Item as='li' value='-'>
                        You should be able to find FraudHooks on the partner friendly app store
                    </List.Item>
                    <List.Item as='li' value='-'>
                        <a href='https://apps.shopify.com/collections/partner-friendly-apps'>Partner Friendly Apps</a>
                    </List.Item>
                </List.Item>
            </List.Item>
            <List.Item as='li' value='*'>
                Is there a reduced plan for Shopify employee stores?
                <List.Item as='ol'>
                    <List.Item as='li' value='-'>
                        Yes, we offer a 50% off plan for Shopify employees
                    </List.Item>
                </List.Item>
            </List.Item>
            <List.Item as='li' value='*'>
                What happens when I uninstall?
                <List.Item as='ol'>
                    Your settings are deleted from our servers
                </List.Item>
            </List.Item>
            <List.Item as='li' value='*'>
                Can I re-install on the same Shopify store?
                <List.Item as='ol'>
                    Yes, when you re-install you'll need to activate the app again
                </List.Item>
            </List.Item>
            <List.Item as='li' value='*'>
                If I set the risk level to Medium, will High risk orders still cancel?
                <List.Item as='ol'>
                    <List.Item as='li' value='-'>
                        Yes, we cancel orders at the same level or <i>higher</i> than the
                        risk level set in the settings
                    </List.Item>
                </List.Item>
            </List.Item>
            <List.Item as='li' value='*'>
                How does all of this work?
                <List.Item as='ol'>
                    <List.Item as='li' value='-'>
                        We use AWS EventBridge to process incoming webhooks from Shopify
                        and then we send those hooks into various services where they can
                        be further processed
                    </List.Item>
                    <List.Item as='li' value='-'>
                        These webhooks are processed in near-realtime, usually anywhere from
                        a few hundred ms to ~15000 ms depending on the response from AWS and
                        the response from Shopify combined
                    </List.Item>
                </List.Item>
            </List.Item>
            <List.Item as='li' value='*'>
                What kind of tech are you using?
                <List.Item as='ol'>
                <List.Item as='li' value='-'>
                        <p>We scaffold the project with the <a href='https://shopify.github.io/shopify-app-cli/'>Shopify CLI</a></p>
                    </List.Item>
                    <List.Item as='li' value='-'>
                        <p>We use the Shopify App Bridge React Polaris components with 
                            currently Next.js 9.4 for the frontend</p>
                        <p>AWS Amplify is used on the frontend for GraphQL queries</p>
                        <p>React hooks are used wherever possible, including Apollo client hooks</p>
                        <p>We try to use React functional components wherever possible, and prefer
                        to manage React state with &nbsp;
                        <a href='https://reactjs.org/docs/hooks-reference.html#usereducer'>useReducer</a> hooks</p>
                    </List.Item>
                    <List.Item as='li' value='-'>
                        <p>On the backend we use Koa.js for the server for some routes, as well as &nbsp;
                        <a href='https://github.com/aws-amplify/amplify-js'>AWS Amplify</a> with GraphQL, 
                        &nbsp;<a href='https://github.com/aws/chalice/'>Chalice with Python</a> 
                        &nbsp;listening for AWS SNS events, with SQS Fifo queues for deduping and 
                        SES for transactional email</p>
                    </List.Item>
                    <List.Item as='li' value='-'>
                        <p>We also make heavy use of <a href='https://github.com/nprutan/turtlefy'>turtlefy</a>, the Python package that has
                            grown out of many Shopify python projects with similar needs
                        </p>
                        <p></p>
                    </List.Item>
                </List.Item>
            </List.Item>
  </List>
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
                <Link href='/contact'>
                    <List.Item as='a'>Contact Us</List.Item>
                </Link>
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
