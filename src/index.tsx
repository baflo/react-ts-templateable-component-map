import * as React from "react";
import { render } from "react-dom";
import { Feed } from "./feed";

class Templated extends React.Component {
  render() {
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
