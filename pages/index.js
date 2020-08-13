import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
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
  <Image fluid src='/composed_cloud_banner.png'></Image>
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
            style={{ minHeight: 700, padding: '1em 0em' }}
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
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>Contact</Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                <Menu.Item as='a'>FraudHooks</Menu.Item>
                <Menu.Item as='a'>Hubmetrix</Menu.Item>
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
            <Menu.Item as='a' active>
                  Home
              </Menu.Item>
              <Menu.Item as='a'>Contact</Menu.Item>
              <Menu.Item as='a'>About</Menu.Item>
              <Menu.Item as='a'>FraudHooks</Menu.Item>
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
            <Icon name='cloud upload' size='large' /> Cloud Integrations
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We do cloud integrations, and we really like microservices.
              How about an event-driven architecture? We've got you covered.
              Or a custom embedded Shopify app? Let's go.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={8}>
          <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
              <Icon name='box' size='large' /> Ecommerce Apps
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We make clean and useful ecommerce apps for platforms like Shopify, BigCommerce and Volusion. 
              Let us know what you've got in mind.
            </p>
            {/* <Image bordered rounded size='large' src='/images/wireframe/white-image.png' /> */}
          </Grid.Column>
        </Grid.Row>
        <Divider hidden />
        <Grid.Row>
        <Grid.Column floated='left' width={8}>
          <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
          <Icon name='wrench' size='large' />System Maintenance
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Have a legacy system that needs some love and attention? 
              We'll maintain it for you. Get in touch and we can chat about requirements.
            </p>
            {/* <Image bordered rounded size='large' src='/images/wireframe/white-image.png' /> */}
          </Grid.Column>
          <Grid.Column floated='right' width={8}>
          <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
          <Icon name='code branch' size='large' />Custom Code
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Need some help with your Python or JS project?
              Let us take a look at that repo.
            </p>
            {/* <Image bordered rounded size='large' src='/images/wireframe/white-image.png' /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
          BTW, We Specialize In <Icon name='aws' size='massive'/> Integrations
        </Header>
        <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
          If you've got some systems that need to talk, and they've 
          got APIs with good documentation, we can easily hook them up.
          We'll probably use Chalice and Python, or the Amplify framework 
          with a GraphQL backend.
          We're kinda like a systems matchmaker.
          But we use code and it's not exciting to talk about at parties.
          We promise you'll be excited about how it'll transform your business though.
          
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
                <List.Item as='a'>Privacy Policy</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout
