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
    <></>  
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
                  <Menu.Item as='a' active>Contact</Menu.Item>
                </Link>
                <Link href='/about'>
                  <Menu.Item as='a'>About</Menu.Item>
                </Link>
                <Link href='/fraudhooks'>
                  <Menu.Item as='a'>FraudHooks</Menu.Item>
                </Link>
                {/* <Link href='/hubmetrix'>
                  <Menu.Item as='a'>Hubmetrix</Menu.Item>
                </Link> */}
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
            <Link href='/'>
                <Menu.Item as='a'>
                Home
                </Menu.Item>
            </Link>
            <Link href='/contact'>
                <Menu.Item as='a' active>Contact</Menu.Item>
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
        <Container text>
            <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
                <Icon name='sound' size='massive'/>Contact Us
            </Header>
            <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
            ‪   (720) 588-8572‬
            </p>
            <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
                Please feel free to reach out any time!
            </p>
        </Container>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
            <Icon name='envelope outline' size='large' /> General Contact
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              info@composedcloud.com
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={8}>
          <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
              <Icon name='box' size='large' /> Support for FraudHooks
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              support@composedcloud.com
            </p>
            {/* <Image bordered rounded size='large' src='/images/wireframe/white-image.png' /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
