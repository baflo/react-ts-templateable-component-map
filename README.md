This shows how a templateable component map could be built (see file [./src/templateable.tsx]). It can be used as follows:

```tsx
import * as React from "react";
import { render } from "react-dom";
import { templateable } from "./templateable";

// Define some base component for the template
class Post extends React.Component<{ text: string } & React.HTMLAttributes<HTMLDivElement>> {
  render() {
    const htmlProps = { ...this.props };
    delete htmlProps.text;

    return (
      <div {...htmlProps}>
        {this.props.text}
      </div>
    )
  }
}

// Make a templateable map from the base component
const Feed = templateable(Post);

class Templated extends React.Component {
  render() {
    // Some data items that the base component shall use
    const items = [{ text: 'Hello' }, { text: 'Bye!' }];

    return (
      <div>
        {/* Just put data elements for the Post component in the array. */}
        <Feed items={items} />

        {/* One can put divs around. */}
        <Feed items={items}>
          {
            post => <div style={{ color: 'blue' }}>{post}</div>
          }
        </Feed>

        {/* Or modify. */}
        <Feed items={items}>
          {
            post => {
              const newProps: { text: string } & React.HTMLAttributes<HTMLDivElement>
                = { ...post.props, style: { color: 'red' } };

              return React.cloneElement(post, newProps);
            }
          }
        </Feed>

        {/* Or filter. */}
        <Feed items={items}>
          {
            (post, idx, data) => {
              if (data[idx].text.toLowerCase().indexOf('bye') !== -1) {
                return null;
              }
              else {
                return post;
              }
            }
          }
        </Feed>
      </div>
    )
  }
}

render(<Templated />, document.getElementById("root"));

```
