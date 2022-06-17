import { click, render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

import { setupLink, linkFor } from "ember-link/test-support";

import hbs from "htmlbars-inline-precompile";

module("`setupLink` example", function (hooks) {
  setupRenderingTest(hooks);
  setupLink(hooks);

  test("`<Link>` component works in render tests", async function (assert) {
    await render(hbs`<Hello />`);

    const link = linkFor("hello");
    link.onTransitionTo = assert.step("link clicked");

    await click("a");

    assert.verifySteps(["link clicked"]);
  });
});
