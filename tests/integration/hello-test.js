import { click, render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

import { setupLink, linkFor } from "ember-link/test-support";

import hbs from "htmlbars-inline-precompile";

module("`setupLink` example", function (hooks) {
  setupRenderingTest(hooks);
  setupLink(hooks);

  test("`<Link>` component works in render tests", async function (assert) {
    await render(hbs`
      <Link @route="some.route" as |l|>
        <a
          href={{l.url}}
          class={{if l.isActive "is-active"}}
          {{on "click" l.transitionTo}}
        >
          Click me
        </a>
      </Link>
    `);

    const link = linkFor("some.route");
    link.onTransitionTo = assert.step("link clicked");

    // console.log(link);
    // await this.pauseTest();

    await click("a");

    assert.verifySteps(["link clicked"]);
  });

  test("inside component same thing", async function (assert) {
    await render(hbs`<Hello />`);

    const link = linkFor("hello");
    link.onTransitionTo = assert.step("link clicked");

    // console.log(link);
    // await this.pauseTest();

    await click("a");

    assert.verifySteps(["link clicked"]);
  });
});
