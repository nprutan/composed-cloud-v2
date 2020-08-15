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
                  <Menu.Item as='a'>Contact</Menu.Item>
                </Link>
                <Link href='/about'>
                  <Menu.Item as='a' active>About</Menu.Item>
                </Link>
                <Link href='/fraudhooks'>
                  <Menu.Item as='a'>FraudHooks</Menu.Item>
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
            <Link href='/'>
                  <Menu.Item as='a'>
                    Home
                  </Menu.Item>
                </Link>
                <Link href='/contact'>
                  <Menu.Item as='a'>Contact</Menu.Item>
                </Link>
                <Link href='/about'>
                  <Menu.Item as='a' active>About</Menu.Item>
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
        <Container text>
            <Header as='h3' style={{ fontSize: '2em', color: '#5e5c5c' }}>
                What's the story with Composed Cloud?
            </Header>
            <Divider />
            <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
                Composed Cloud Solutions is a software development company based in Denver, Colorado.
                Prior to starting Composed Cloud in 2017, Nate Rutan was a cofounder of a successful medical manufacturing startup
                in the sleep industry.
            </p>
            <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
                Founded in 2009, that company went on to gross over 12 million dollars during his tenure. 
                Nate’s background includes a B.S. in Computer Information Systems and an M.A. in Historical Theology. 
                A strange mix for sure, but one that informs a unique outlook on the world of technology.
            </p>
            <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
                Going way back, Nate is a bit of an OG in the tech world. 
                His first computer was a big beige box that ran a processor that nowadays most people have probably never heard of. 
                He used to take these boxes apart and install stuff in them.
                Installing lots of stuff in these boxes was the way that people hand-rolled their own tech stack back in those days. 
            </p>
            <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
                Nate has seen lots of versions of Windows, MacOs and Ubuntu, too many really, and he’s been handy on the *nix command line 
                for more than a decade. Actually more like a decade and six years, but who’s counting? I guess it's almost been two now.
                Was anybody prepared for 2020?
            </p>
            <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
                Nate began working as a developer in 2012. He started with Python, moved on to Node.js, 
                then found his way into Java, and finally C#. After that long arc, he has now realized how much he truly loves Python and uses
                it whenever and wherever he can. He’s found hours of inspiration from people like Raymond Hettinger, James Powell, Alex Martelli, 
                BDFL, Keneth Reitz, Luciano Ramalho, Jon Skeet, K. Scott Allen, Robert Smallshire and countless others. 
            </p>
            <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
                He’s got a growing collection of Kindle books on various languages, but the one he reads more than others is Fluent Python by Luciano Ramalho. 
                He’s also thinking of giving Go a shot sometime soon, but will keep loving Python anyway because he is a loyal person and wouldn’t want Python 
                to feel bad.
            </p>
            <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
                Here at Composed Cloud Solutions, we love the cloud, but we have a particular fondness for AWS. 
                But we are always curious and passionate about new technologies. We learn everyday. 
                We are always on the lookout for new and interesting projects. 
                Nate likes to watch core Python developers give talks on YouTube when he should probably be sleeping. But that’s another story. 
            </p>
            <p style={{ fontSize: '1.33em', color: '#5e5c5c' }}>
                The point is that we really like to learn new things, and we are excited about using those things to help business
                with the things they are excited about.
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
