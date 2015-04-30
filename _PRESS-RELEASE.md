# Project Name #

<!-- 
> This material was originally posted [here](http://www.quora.com/What-is-Amazons-approach-to-product-development-and-product-management). It is reproduced here for posterities sake.

There is an approach called "working backwards" that is widely used at Amazon. They work backwards from the customer, rather than starting with an idea for a product and trying to bolt customers onto it. While working backwards can be applied to any specific product decision, using this approach is especially important when developing new products or features.

For new initiatives a product manager typically starts by writing an internal press release announcing the finished product. The target audience for the press release is the new/updated product's customers, which can be retail customers or internal users of a tool or technology. Internal press releases are centered around the customer problem, how current solutions (internal or external) fail, and how the new product will blow away existing solutions.

If the benefits listed don't sound very interesting or exciting to customers, then perhaps they're not (and shouldn't be built). Instead, the product manager should keep iterating on the press release until they've come up with benefits that actually sound like benefits. Iterating on a press release is a lot less expensive than iterating on the product itself (and quicker!).

If the press release is more than a page and a half, it is probably too long. Keep it simple. 3-4 sentences for most paragraphs. Cut out the fat. Don't make it into a spec. You can accompany the press release with a FAQ that answers all of the other business or execution questions so the press release can stay focused on what the customer gets. My rule of thumb is that if the press release is hard to write, then the product is probably going to suck. Keep working at it until the outline for each paragraph flows. 

Oh, and I also like to write press-releases in what I call "Oprah-speak" for mainstream consumer products. Imagine you're sitting on Oprah's couch and have just explained the product to her, and then you listen as she explains it to her audience. That's "Oprah-speak", not "Geek-speak".

Once the project moves into development, the press release can be used as a touchstone; a guiding light. The product team can ask themselves, "Are we building what is in the press release?" If they find they're spending time building things that aren't in the press release (overbuilding), they need to ask themselves why. This keeps product development focused on achieving the customer benefits and not building extraneous stuff that takes longer to build, takes resources to maintain, and doesn't provide real customer benefit (at least not enough to warrant inclusion in the press release).
 -->
 
# Thumbs Check #
### Enhanced real-time interaction with analytics ###

## Summary ##
  A smartphone based "thumbs-check" system for a lecturer to gauge how well the class understood newly introduced material, and a random student selector for the user to pick a student to interact with. Includes time-stamp analytics for the lecturer to trouble-shoot the lecture according to what was most confusing, and the ability to issue instant micro-quizzes, equivalent to "arms this way" polling.  

## Problem ##
  * The visual thumbs-check system is very informal, and is not set up for post-lecture analytics.
  * Certain students are very vocal during lecture, and attempts to pick random students to speak are not very random, and often settle on the same students.
  * Polling the class on how well they think they understand something is subject to inaccurate self-reporting.
  * Question queue management is yet another burden on the lecturer

## Solution ##
  * Each thumbs-check is time-stamped; this can be used to revise the portion of the lectures that are unclear.
  * Random student selection precludes selection biases so that more students will interact during lecture.
  * Micro-quizzes are more accurate than self-reporting; students can mistakenly think they understand something, but not with quizzes.
  * The question queue takes this burden off the lecturer

## Quote from You ##
  > We took the pain-points of our lectures and turned it into an opportunity.

## How to Get Started ##
  1) Students and Lecturers both log in with Github
  2) Prepare and store sets of instant quizes.
  3) Start a lecture from the lecturer's interface.
  4) Issue a thumbs check at will. The dashboard shows live data updates as data comes in.
  5) Issue pre-written instant quizzes at will.

## Customer Quote ##
  > Instant quizzes and thumbs-check analytics let us do test-driven-development of our lectures. Rapid iteration of our teaching has never been easier.

## Closing and Call to Action ##
  Sign up for Thumbs Check and prepare a lecture today!
